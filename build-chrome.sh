#!/bin/bash

# Build Chrome Extension Package
# Creates a clean Chrome-compatible package ready for Chrome Web Store

BUILD_DIR="build-chrome"

echo "🏗️  Building Chrome extension..."

# Clean previous build
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy core files
echo "📦 Copying files..."
cp -r icons popup "$BUILD_DIR/"
cp content.js "$BUILD_DIR/"
cp CODE_OF_CONDUCT.md CHANGELOG.md PRIVACY.md README.md CONTRIBUTING.md "$BUILD_DIR/"

# Copy Chrome-specific files and rename
cp manifest-chrome.json "$BUILD_DIR/manifest.json"
cp background-chrome.js "$BUILD_DIR/background.js"

# Copy popup HTML but update JS reference
mkdir -p "$BUILD_DIR/popup"
cp popup/popup.html "$BUILD_DIR/popup/"
cp popup/popup.css "$BUILD_DIR/popup/"
cp popup-chrome.js "$BUILD_DIR/popup/popup.js"

# Create zip for Chrome Web Store
cd "$BUILD_DIR"
zip -r ../publishing-date-finder-chrome-v1.2.5.zip . -x "*.DS_Store"
cd ..

echo ""
echo "✅ Chrome extension built successfully!"
echo "📦 Package: publishing-date-finder-chrome-v1.2.5.zip"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Upload publishing-date-finder-chrome-v1.2.5.zip"
echo "3. Fill in store listing details"
echo ""
echo "For testing:"
echo "1. Go to chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked' and select the 'build-chrome' folder"
