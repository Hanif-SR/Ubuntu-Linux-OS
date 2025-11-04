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
