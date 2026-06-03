#!/bin/bash
echo "===== Deployment Started: $(date) ====="
cd /home/ec2-user
aws s3 cp s3://nandana-deployment-artifacts/artifact.zip . --region ap-south-1
rm -rf taskapp
mkdir taskapp
unzip -o artifact.zip -d taskapp
cd taskapp
export DB_HOST=appdb-instance.cf6y4ga6mva7.ap-south-1.rds.amazonaws.com
export DB_USER=admin
export DB_PASSWORD=Adminnandana123
export DB_NAME=appdb
export PORT=8080
npm install
which pm2 || sudo npm install -g pm2
pm2 stop taskapp 2>/dev/null || true
pm2 start server.js --name taskapp
echo "===== Deployment Finished: $(date) ====="
pm2 status