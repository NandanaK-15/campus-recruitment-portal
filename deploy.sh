#!/bin/bash

echo "===== CRP Deployment Started: $(date) ====="

cd /home/ec2-user

echo "Downloading artifact from S3..."
aws s3 cp s3://nandana-deployment-artifacts/artifact.zip . --region ap-south-1

echo "Cleaning old deployment..."
rm -rf crpapp
mkdir crpapp

echo "Extracting artifact..."
unzip -o artifact.zip -d crpapp
cd crpapp

echo "Setting environment variables..."
export DB_HOST=appdb-instance.cf6y4ga6mva7.ap-south-1.rds.amazonaws.com
export DB_USER=admin
export DB_PASSWORD=Adminnandana123
export DB_NAME=appdb
export PORT=8080

echo "Installing dependencies..."
npm install

echo "Installing PM2 if not present..."
pm2 --version 2>/dev/null || sudo npm install -g pm2

echo "Starting application..."
pm2 stop crpapp 2>/dev/null || true
pm2 start server.js --name crpapp

echo "===== CRP Deployment Finished: $(date) ====="
pm2 status