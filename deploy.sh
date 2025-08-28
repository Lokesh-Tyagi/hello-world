#!/bin/bash

# Deployment script for Shisha Website
echo "🚀 Starting deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p ./deploy

# Copy necessary files for production
echo "📁 Copying production files..."
cp -r .next ./deploy/
cp -r public ./deploy/
cp package*.json ./deploy/
cp next.config.ts ./deploy/

# Create deployment package
echo "📦 Creating deployment package..."
cd deploy
tar -czf ../shisha-website-deploy.tar.gz .

echo "✅ Deployment package created: shisha-website-deploy.tar.gz"
echo ""
echo "📋 Deployment Instructions:"
echo "1. Upload shisha-website-deploy.tar.gz to your server"
echo "2. Extract: tar -xzf shisha-website-deploy.tar.gz"
echo "3. Install dependencies: npm install --production"
echo "4. Start server: npm start"
echo ""
echo "🌐 Your application will be available at: http://your-server:3000"
echo ""
echo "🔧 Alternative: Use PM2 for production"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js" 