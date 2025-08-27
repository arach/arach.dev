#!/bin/bash

echo "🚀 Deploying agents.arach.dev..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

# Build the site
echo "🔨 Building site..."
pnpm build

# Deploy to GitHub Pages
echo "📤 Deploying to GitHub Pages..."
pnpm deploy

echo "✅ Deployment complete! Site will be available at https://agents.arach.dev"
echo "Note: DNS propagation may take a few minutes."