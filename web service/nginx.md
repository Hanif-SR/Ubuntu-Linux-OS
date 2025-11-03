# 🖥️ Installing and Configuring Nginx on Ubuntu 22.04

This document provides step-by-step instructions for installing and configuring **Nginx** on **Ubuntu 22.04**.
The guide covers installation, service management, firewall configuration, and basic setup verification.

---

## ⚙️ Step 1: Update the System

Before installing Nginx, ensure that the system’s package index is up-to-date:

```bash
sudo apt update
sudo apt upgrade -y
```

Updating the system ensures that all packages and dependencies are current and compatible.

---

## 🟢 Step 2: Install Nginx

Install Nginx using the package manager:

```bash
sudo apt install nginx -y
```

This command downloads and installs Nginx along with any required dependencies.

---

## 🔹 Step 3: Start and Enable Nginx Service

After installation, start the Nginx service and enable it to run automatically on system boot:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

Verify that Nginx is active and running:

```bash
sudo systemctl status nginx
```

---

## 🌐 Step 4: Adjust the Firewall

If UFW (Uncomplicated Firewall) is enabled, allow HTTP and HTTPS traffic:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw reload
```

Verify the firewall rules:

```bash
sudo ufw status
```

---

## 🔍 Step 5: Verify Nginx Installation

Open a web browser and navigate to your server’s IP address:

```
http://server_ip_or_domain
```

A default Nginx welcome page confirms that the installation was successful.

---

## 🛠️ Step 6: Configure Nginx

1. Configuration files are located in `/etc/nginx/`.
2. Virtual host files are typically in `/etc/nginx/sites-available/`.
3. To create a new site configuration, create a file in `sites-available` and then link it to `sites-enabled`:

```bash
sudo nano /etc/nginx/sites-available/example.com
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

4. Test the Nginx configuration for syntax errors:

```bash
sudo nginx -t
```

5. Reload Nginx to apply the changes:

```bash
sudo systemctl reload nginx
```

---

## ✅ Step 7: Additional Notes

* Nginx logs are located in `/var/log/nginx/`.
* Configuration changes require `nginx -t` to test syntax before reloading.
* For production environments, consider configuring SSL with **Certbot** for HTTPS.

---
