Below are **all files** for the small Node.js + Nginx demo app — ready to copy into a project folder (`node-nginx-demo/`).
File paths are shown above each code block. After placing the files, run `npm install` and then start with `node app.js` or `pm2 start app.js --name node-nginx-demo`.

> Reminder: this app is intended for a **lab/testing environment (HTTP)** only. Do not expose it to production or the public internet.

---

### `package.json`

```json
{
  "name": "node-nginx-demo",
  "version": "1.0.0",
  "description": "Small Node.js app for security testing behind Nginx",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.0",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "helmet": "^6.0.1"
  }
}
```

---

### `.env.example`

```
PORT=3000
SESSION_SECRET=change_this_secret
```

---

### `app.js`

```js
// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const helmet = require('helmet');
const flash = require('connect-flash');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure log directory exists (adjust permissions if needed)
const LOGDIR = '/var/log/node-nginx-demo';
try { fs.mkdirSync(LOGDIR, { recursive: true }); } catch (e) {}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Basic Helmet headers (CSP enabled but can be disabled for testing)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"]
    }
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax'
    // secure: true // keep commented for HTTP testing
  }
}));
app.use(flash());

// --- Simple request logging (append-only) ---
app.use((req, res, next) => {
  const line = `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}\n`;
  fs.appendFile(path.join(LOGDIR, 'access.log'), line, () => {});
  next();
});

// --- Demo user (in-memory) ---
// username: testuser
// password (plain): Password123!
// bcrypt-hashed below
const demoUser = {
  id: 1,
  username: 'testuser',
  passwordHash: '$2b$10$wucpba6v0EJ1i1K9y3uU8urG1qgk1hS6Y7o2Zc8z6nCg2p4m8vB9W'
};

// Make flash & user available to views
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.user = req.session.user;
  next();
});

// Routes
app.get('/', (req, res) => res.render('index'));

app.get('/about', (req, res) => res.render('about'));

app.get('/login', (req, res) => res.render('login'));

// Login handler
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('error', 'Username and password required.');
    return res.redirect('/login');
  }

  // simple check
  if (username !== demoUser.username) {
    await fakeDelay();
    req.flash('error', 'Invalid credentials.');
    return res.redirect('/login');
  }

  const ok = await bcrypt.compare(password, demoUser.passwordHash);
  if (!ok) {
    await fakeDelay();
    req.flash('error', 'Invalid credentials.');
    return res.redirect('/login');
  }

  req.session.user = { id: demoUser.id, username: demoUser.username };
  req.flash('info', 'Login successful.');
  return res.redirect('/dashboard');
});

app.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Intentionally interesting endpoints for scanning/bruteforce
app.get('/admin', (req, res) => {
  res.send('<h1>Admin Panel</h1><p>Restricted area. (Lab only)</p>');
});

app.get('/secret', (req, res) => {
  res.status(403).send('Forbidden');
});

// Serve hidden files directory (place test files under public/.hidden-files/)
app.use('/.hidden-files', express.static(path.join(__dirname, 'public/.hidden-files')));

// Helper functions
function ensureAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  req.flash('error', 'Please log in to view that page.');
  return res.redirect('/login');
}

function fakeDelay() {
  return new Promise(resolve => setTimeout(resolve, 500));
}

// Start server
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
```

---

### `views/index.ejs`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Home — Node Nginx Demo</title>
  <link rel="stylesheet" href="/css.css" />
</head>
<body>
  <h1>Node + Nginx Demo</h1>
  <p>A small demo app for security testing (lab use only).</p>
  <% if (!user) { %>
    <a href="/login">Login</a>
  <% } else { %>
    <a href="/dashboard">Dashboard</a>
    <form action="/logout" method="post" style="display:inline"><button>Logout</button></form>
  <% } %>
  <hr>
  <a href="/about">About</a>
</body>
</html>
```

---

### `views/login.ejs`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Login — Node Nginx Demo</title>
  <link rel="stylesheet" href="/css.css" />
</head>
<body>
  <h1>Login</h1>
  <% if (error && error.length) { %>
    <div class="flash error"><%= error[0] %></div>
  <% } %>
  <form method="post" action="/login">
    <label>Username: <input name="username" required></label><br>
    <label>Password: <input name="password" type="password" required></label><br>
    <button type="submit">Login</button>
  </form>
  <p><a href="/">Back home</a></p>
</body>
</html>
```

---

### `views/dashboard.ejs`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Dashboard — Node Nginx Demo</title>
  <link rel="stylesheet" href="/css.css" />
</head>
<body>
  <h1>Dashboard</h1>
  <p>Welcome, <%= user.username %>!</p>
  <form action="/logout" method="post"><button>Logout</button></form>
  <p><a href="/">Home</a></p>
</body>
</html>
```

---

### `views/about.ejs`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>About — Node Nginx Demo</title>
  <link rel="stylesheet" href="/css.css" />
</head>
<body>
  <h1>About</h1>
  <p>This small app exists for security testing in a lab environment.</p>
  <p><a href="/">Back</a></p>
</body>
</html>
```

---

### `public/css.css`

```css
body { font-family: Arial, sans-serif; margin: 2rem; }
.flash.error { color: #b00020; }
button { padding: 6px 12px; }
```

---

### `public/.hidden-files/test.txt`

```
This is a hidden file for directory bruteforce testing.
```

(Place the file at `public/.hidden-files/test.txt` so the route `/.hidden-files/test.txt` exists.)

---

### `nginx/myapp.conf`

Place this under `/etc/nginx/sites-available/myapp` (replace `example.com` with the VM IP or domain), then enable with a symlink to `sites-enabled`.

```nginx
server {
    listen 80;
    server_name example.com; # replace with your domain or server IP

    # Basic security headers (no HSTS to keep HTTP lab-friendly)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Quick setup steps (after files are in place)

1. Install dependencies:

```bash
npm install
```

2. Start app (dev):

```bash
node app.js
```

3. Or start with PM2 (recommended for persistent testing):

```bash
sudo npm install -g pm2
pm2 start app.js --name node-nginx-demo
pm2 save
pm2 startup
```

4. Ensure Nginx is enabled and proxying (see nginx steps above). Point browser or Burp to `http://<VM_IP_or_hostforward>`.

5. Login credentials:

* **Username:** `testuser`
* **Password:** `Password123!`

---

## Notes & recommendations

* For HTTP lab testing, ensure `cookie.secure` remains **disabled** (commented).
* To make brute-force defense experiments possible, consider installing `express-rate-limit` later.
* PM2 logs and the app's `/var/log/node-nginx-demo/access.log` are useful for Wazuh agent monitoring.
* Keep the VM isolated, and do not expose it to the public internet.

---

If the user wants, I can:

* Provide a single shell script that creates the folder structure and writes all files automatically; **or**
* Provide a `docker-compose.yml` version to run the entire stack in containers for easy resets.
  Which option should be generated next?
