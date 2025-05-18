#!/bin/bash

# Script to help deploy to Render

echo "Preparing for Render deployment..."

# Ensure all dependencies are installed
npm install

# Generate Prisma client
npx prisma generate

# Build the application
npm run build

echo "Build completed successfully!"
echo ""
echo "To deploy on Render:"
echo "1. Create an account on render.com"
echo "2. Create a new Web Service and connect your repository"
echo "3. Use the following settings:"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "4. Create a PostgreSQL database in Render"
echo "5. Set up the required environment variables"
echo ""
echo "Or use the render.yaml file with Render Blueprints for automatic setup." 