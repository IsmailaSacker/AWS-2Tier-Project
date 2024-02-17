# Application Deployment using Terraform and Traditional Methods

# Architecture image

![Alt text](architecture-image.png)

This guide outlines the steps to deploy a Node.js application on AWS using both Terraform and traditional provisioning methods.
# About
This project involves architecting a robust infrastructure for a dynamic web application. Leveraging Terraform, to design and deploy a Virtual Private Cloud (VPC) on AWS. The architecture revolves around EC2 instances for hosting the web application and MySQL RDS for managing the database.

# Background
Your team is actively developing a web application with a reliance on a database. Your specific responsibility involves configuring the VPC, EC2 instances, and RDS instances using Terraform. The architecture consists of EC2 instances for deploying the web application and MySQL RDS for the database.

# Requirements
- EC2 instances must be accessible globally via HTTP.
- SSH access to EC2 instances is restricted to designated users.
- RDS should reside in a private subnet and remain inaccessible from the internet.
- Only EC2 instances should have communication privileges with the RDS instance.

# Task Execution
- Create a VPC
- Create an Internet Gateway and Attach it to the VPC
- Establish 3 Subnets: 1 Public for EC2 and 2 Private for RDS
- Set Up 2 Route Tables: 1 Public and 1 Private
- Define 2 Security Groups: 1 for EC2 and 1 for RDS
- Create the Database Subnet Group
- Deploy the MySQL RDS Database
- Provision the EC2 Instance
- Verify the Correct Configuration of All Components
  
## Terraform Deployment

### Prerequisites

- Install Terraform on your local machine.

```bash
# Terraform Installation
# Example for Linux
sudo apt-get update
sudo apt-get install terraform
```

### Deployment Steps

1. Clone the project repository.

```bash
git clone https://github.com/your/repository.git
cd repository
```

2. Navigate to the Terraform directory.

```bash
cd terraform
```

3. Initialize Terraform.

```bash
terraform init
```

4. Modify the `variables.tf` file with your AWS credentials and other necessary variables.

5. Review and apply the Terraform configuration.

```bash
terraform apply
```

6. Confirm by typing "yes" when prompted.

7. After deployment, note the output values for further configuration steps.

## Traditional Deployment

### Node.js Application Setup

1. Follow the Node.js Application Deployment Guide up to the "Install and Configure Nginx" section.

### Nginx Configuration for Load Balancer

1. Create an Nginx configuration file for your Node.js application.

```bash
sudo nano /etc/nginx/sites-available/MySQLApp
# Add configuration details (see above)

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/MySQLApp /etc/nginx/sites-enabled

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### AWS Deployment

1. Create an Amazon Machine Image (AMI) from the running instance provisioned traditionally.

2. Create a launch template with the AMI created.

3. Set up an auto-scaling group to manage the instances.

4. Create a target group and associate it with the auto-scaling group.

5. Configure a load balancer to distribute traffic among instances.

6. Copy the load balancer domain and test it in a browser to ensure traffic is directed to the instances.

## Notes

- Ensure proper security group settings for both Terraform and traditional provisioning.

- Periodically update and manage your infrastructure with Terraform commands (`terraform plan`, `terraform apply`, etc.).

- Monitor application and infrastructure health regularly.

By following these steps, you'll have a comprehensive deployment guide for your Node.js application using both Terraform and traditional provisioning methods.
