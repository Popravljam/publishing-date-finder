# 📅 Publishing Date Finder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-orange.svg)](https://addons.mozilla.org/)

A powerful Firefox extension that detects publication dates from web pages using multiple detection methods with confidence indicators. Perfect for journalists, researchers, and anyone who needs to verify when content was published.

## 🆕 What's New in v1.3.0 (Beta)

**International Support & Enhanced Detection** - Major update! Now supports multiple date formats (DD.MM.YYYY, DD/MM/YYYY, ISO 8601) and multi-language keywords (German, French, Italian). Enhanced URL structure analysis catches more date patterns. Position-based confidence helps distinguish main content from footer suggestions. Tested on BBC, DW, Bundeswehr, and international news sites. [See full changelog](CHANGELOG.md)

## Features

### Smart Content Filtering 🎯
The extension intelligently focuses on the main article content, automatically filtering out dates from:
- Sidebars and related articles
- Navigation menus and headers
- Recommended/trending sections
- Comments and discussions
- Footers and widgets

This ensures you get the publication date of the actual article you're reading, not from surrounding content.

### Detection Methods
1. **Open Graph Metadata** - `og:published_time`, `og:article:published_time`
2. **JSON-LD Structured Data** - Schema.org structured data
3. **HTML Meta Tags** - Dublin Core, custom meta tags
4. **Microdata** - `itemprop` attributes (with smart filtering)
5. **HTML Time Elements** - `<time>` tags with datetime attributes (with smart filtering)
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
Download from the Firefox Add-ons store (coming soon) or install the `.xpi` package.

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
