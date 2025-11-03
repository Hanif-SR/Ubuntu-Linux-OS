# 🟢 Node.js App Deployment with Nginx and PM2 on Ubuntu 22.04

This guide outlines the process of installing Node.js, setting up PM2, and configuring Nginx as a reverse proxy to host a production-ready Node.js application on **Ubuntu 22.04**.

---

## **Step 1: Update Package Index**

```bash
sudo apt update
```

> Updates package information. No OS upgrade occurs.

---

## **Step 2: Install Node.js and npm**

Install Node.js using the official NodeSource repository to get the latest stable version:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

* Verify installation:

```bash
node -v
npm -v
```

---

## **Step 3: Create a Sample Node.js Application**

1. Create a project directory:

```bash
mkdir ~/myapp
cd ~/myapp
```

2. Initialize a Node.js app:

```bash
npm init -y
```

3. Install Express.js:

```bash
npm install express
```

4. Create `app.js`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js behind Nginx!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## **Step 4: Install PM2**

```bash
sudo npm install -g pm2
```

* Start the app with PM2:

```bash
pm2 start app.js --name myapp
```

* Save the process to restart on reboot:

```bash
pm2 startup systemd
pm2 save
```

> PM2 now ensures the Node.js app stays running, even if it crashes or the server restarts.

---

## **Step 5: Install and Configure Nginx**

1. Install Nginx:

```bash
sudo apt install nginx -y
```

2. Create a new site configuration:

```bash
sudo nano /etc/nginx/sites-available/myapp
```

Add the following:

```nginx
server {
    listen 80;
    server_name your_domain_or_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site and test configuration:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## **Step 6: Test the Setup**

* Open a web browser and navigate to:

```
http://your_server_ip_or_domain
```

* You should see:

> **Hello from Node.js behind Nginx!**

---

## **Step 7: Optional — Enable UFW Firewall**

If UFW is enabled, allow HTTP traffic:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

---

✅ **Result:** Node.js app runs in the background with PM2, Nginx handles incoming requests, and the system is production-ready.
