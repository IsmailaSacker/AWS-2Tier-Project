# AWS Tier 2 Application that create, read, update and delete data in RDS database.

# The application sit on EC2 and perform the crud operation through the UI.
# Project Setup and Deployment Guide

### The below steps are performed after the provisions of vps, subnet, security group, ec2, route table, ig-gateway and aws rds by the terraform files.

## Node.js Application Deployment Guide

## Install Node.js and npm

```bash
# To install Node.js
sudo apt-get install -y nodejs

# Install npm
npm install

# Upgrade npm
npm install -g npm
```

## Install Express and Database Client

```bash
# Install Express
npm install express

# Check Express version
npm list express

# Install MySQL client
sudo apt-get update
sudo apt-get install mysql-client
npm install mysql2

# Configure Database Connection
# Edit dbConfig.js with your RDS endpoint, MySQL credentials, and database name
```

## Node.js Version Management with nvm

```bash
# Install nvm
command -v nvm
nvm install 16.14
nvm use 16.14
```

## Import Local Database to RDS

```bash
# Connect to RDS
mysql -h your-rds-endpoint -u your-mysql-username -p

# Import local database to RDS
source local_database_dump.sql

# Test connection
node server.js
```

## Install and Configure Nginx

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/MySQLApp
# Add configuration details (see above)

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/MySQLApp /etc/nginx/sites-enabled

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Start Node.js Server and Test

```bash
# Start Node.js server
http://your-domain-or-ip

# Access the application
http://your-domain-or-ip
```

## Use PM2 for Node.js Process Management

```bash
# Install PM2
npm install -g pm2

# Start Node.js server with PM2
pm2 start server.js

# List running processes
pm2 list

# Save process list
pm2 save

# Configure startup
pm2 startup

# Stop or restart processes
pm2 stop your-app-name
pm2 restart your-app-name
```

## Deploy on AWS with Load Balancer and Auto Scaling

1. Create an image from the running instance.
2. Create a launch template with the created image.
3. Create an auto-scaling group to scale up your instances.
4. Create a target group.
5. Create a load balancer to schedule traffic to your instances.

Copy the domain of the load balancer and test it in a browser to ensure traffic is directed to the instances.
