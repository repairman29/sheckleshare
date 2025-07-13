#!/bin/bash

# GAG Calculator Deployment Script
echo "🌱 Deploying GAG Calculator..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create a simple server for testing
    echo "🚀 Starting local server for testing..."
    echo "📱 Open http://localhost:4173 to view the app"
    echo "🔄 Press Ctrl+C to stop the server"
    
    # Start preview server
    npm run preview
else
    echo "❌ Build failed!"
    exit 1
fi 