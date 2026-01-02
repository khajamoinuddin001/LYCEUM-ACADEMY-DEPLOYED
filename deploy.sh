#!/bin/bash

# Deployment Script for Lyceum Academy (lyceumacad.com)
# Automatically runs on VPS after GitHub push

set -e # Exit on any error

echo "🚀 Starting Automated Deployment Process..."

# 1. Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# 2. Install Dependencies
echo "📦 Installing Frontend Dependencies..."
npm install --no-audit --no-fund

echo "📦 Installing Backend Dependencies..."
cd server
npm install --no-audit --no-fund
cd ..

# 3. Build Frontend
echo "🏗️  Building Frontend..."
npm run build

# 4. Restart/Reload Backend Services
echo "🔄 Reloading Backend Server via PM2..."
# Try to reload first (zero downtime), if it doesn't exist, start it
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs
pm2 save

echo "✅ Deployment Complete! Visit https://lyceumacad.com"
echo "🕒 Completed at: $(date)"
