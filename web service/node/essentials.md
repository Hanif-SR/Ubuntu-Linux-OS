# Configuration script

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
