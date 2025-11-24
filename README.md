# 📅 Publishing Date Finder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-orange.svg)](https://addons.mozilla.org/)

A powerful Firefox extension that detects publication dates from web pages using multiple detection methods with confidence indicators. Perfect for journalists, researchers, and anyone who needs to verify when content was published.

## Features

### Detection Methods
1. **Open Graph Metadata** - `og:published_time`, `og:article:published_time`
2. **JSON-LD Structured Data** - Schema.org structured data
3. **HTML Meta Tags** - Dublin Core, custom meta tags
4. **Microdata** - `itemprop` attributes
5. **HTML Time Elements** - `<time>` tags with datetime attributes
6. **URL Pattern Analysis** - Dates embedded in URLs
7. **Text Heuristics** - Pattern matching in page content
8. **Wayback Machine** - Archive.org fallback for undated pages

### Confidence Indicators
- 🟢 **Green (High)** - Structured metadata, highly reliable
- 🟡 **Yellow (Medium)** - Heuristic detection, probably correct
- 🔴 **Red (Low)** - Estimated or unreliable

## Installation

### Temporary Installation (for testing)
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the `date-detective-addon` folder and select `manifest.json`
5. The addon is now installed temporarily

### Permanent Installation
1. Create a `.xpi` package (see below)
2. Install through Firefox Add-ons manager

## Creating Icons

Before using the addon, you need to create icon files. You can use any 48x48 and 96x96 PNG images. Here's a quick way to create simple placeholder icons:

### Using ImageMagick (if installed):
```bash
cd date-detective-addon/icons
# Create 48x48 icon
convert -size 48x48 xc:transparent -fill "#667eea" -draw "circle 24,24 24,4" \
  -fill white -font Arial -pointsize 28 -gravity center -annotate +0+0 "📅" icon-48.png

# Create 96x96 icon
convert -size 96x96 xc:transparent -fill "#667eea" -draw "circle 48,48 48,8" \
  -fill white -font Arial -pointsize 56 -gravity center -annotate +0+0 "📅" icon-96.png
```

### Or manually:
1. Create two PNG files: `icon-48.png` (48x48 pixels) and `icon-96.png` (96x96 pixels)
2. Use any calendar/date-related icon
3. Place them in the `icons/` folder

### Quick placeholder (macOS):
```bash
cd date-detective-addon/icons
# Create simple colored squares as placeholders
# You'll need to replace these with proper icons later
sips -z 48 48 --setProperty format png /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Clock.icns --out icon-48.png 2>/dev/null || echo "Please create icon-48.png manually"
sips -z 96 96 --setProperty format png /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Clock.icns --out icon-96.png 2>/dev/null || echo "Please create icon-96.png manually"
```

## Usage

1. Navigate to any web page (news article, blog post, etc.)
2. Click the Date Detective icon in your toolbar
3. View detected dates with confidence indicators:
   - **Published** - Original publication date
   - **Modified** - Last update date
   - **Created** - Content creation date
4. Click "Check Archive" to query the Wayback Machine for additional date information
5. Each date shows:
   - The date/time
   - How long ago it was
   - The source/method used to detect it
   - Confidence level (color-coded)

## Development

### Project Structure
```
date-detective-addon/
├── manifest.json          # Firefox addon manifest
├── content.js            # Content script (runs on web pages)
├── background.js         # Background script (handles API calls)
├── popup/
│   ├── popup.html       # Popup UI
│   ├── popup.css        # Popup styles
│   └── popup.js         # Popup logic
├── icons/
│   ├── icon-48.png      # 48x48 icon
│   └── icon-96.png      # 96x96 icon
└── README.md            # This file
```

### Testing
Test the addon on various websites:
- News sites (CNN, BBC, NYTimes)
- Blogs (Medium, WordPress sites)
- Technical documentation
- Social media posts
- Older websites without modern metadata

### Debugging
1. Open the browser console (F12) to see any errors
2. Use `about:debugging` to inspect the addon
3. Check the background script logs for Wayback Machine API issues
4. Use the browser's network inspector to see API calls

## Creating a Distribution Package

To create a signed `.xpi` file for distribution:

```bash
cd date-detective-addon
zip -r -FS ../date-detective.xpi * --exclude '*.git*' --exclude '*README.md'
```

Then submit to Mozilla Add-ons for signing.

## Technical Details

### Permissions
- `activeTab` - Access to the current tab's content
- `https://archive.org/*` - Access to Wayback Machine API

### Browser Compatibility
- Firefox 57+ (Manifest v2)
- Can be adapted for Chrome/Edge with minor modifications

### API Usage
- **Wayback Machine API**: `https://archive.org/wayback/available`
  - Free, no rate limits for reasonable use
  - Returns closest archived snapshot

## Future Enhancements

Possible improvements:
- Support for more languages and date formats
- Machine learning for better heuristic detection
- Export dates to various formats
- Historical view of multiple archived dates
- Integration with other archival services
- User preference for date format display

## Privacy

This extension respects your privacy. See [PRIVACY.md](PRIVACY.md) for details.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Please note that this project follows a [Code of Conduct](CODE_OF_CONDUCT.md).

## Troubleshooting

### "Unable to analyze this page"
- Refresh the page and try again
- Check if the site blocks content scripts
- Some internal pages (about:, chrome:) cannot be analyzed

### No dates found
- Try the Wayback Machine fallback
- Some pages genuinely don't have publication dates
- Check if JavaScript is disabled

### Wayback Machine timeout
- The API might be slow or unavailable
- Try again later
- Some URLs might not be archived

## Credits

Created with ❤️ for people who need to verify when content was published.
