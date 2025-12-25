# Test Sites for Screenshots

Quick reference for testing and capturing screenshots. Open these in your browser with the extension loaded.

## News Sites (English)

### BBC News
- https://www.bbc.com/news/articles/c5y3g1p2g2ko
- https://www.bbc.com/news/world
- Good for: High confidence detection, multiple dates

### CNN
- https://www.cnn.com/world
- Good for: Standard news article detection

### TechCrunch
- https://techcrunch.com/latest/
- Good for: Tech news, updated dates

### The Guardian
- https://www.theguardian.com/international
- Good for: Multiple date types

## News Sites (International)

### Deutsche Welle (German)
- https://www.dw.com/de
- Good for: DD.MM.YYYY format, German language

### El País (Spanish)
- https://elpais.com/
- Good for: Spanish language dates

### Le Monde (French)
- https://www.lemonde.fr/
- Good for: French date formats

## Blogs & Long-form

### Medium
- https://medium.com/
- Good for: Blog posts, author info

### Substack
- https://substack.com/discover
- Good for: Newsletter-style content

## Sites for Edge Cases

### Sites with No Dates
- https://example.com
- Good for: Testing Wayback Machine fallback

### Old Archive Sites
- Use Wayback Machine on these to show archive feature

## Screenshot Checklist

### Screenshot 1: Main Popup (Required)
- Site: BBC News article
- Show: Extension popup with 2-3 dates detected
- Highlight: Green/yellow confidence indicators
- Size: 1280x800

### Screenshot 2: High Confidence Detection (Recommended)
- Site: CNN or TechCrunch article
- Show: Green (high confidence) dates with source
- Highlight: "Source: Open Graph metadata"
- Size: 1280x800

### Screenshot 3: Multiple Date Types (Recommended)
- Site: News article with published + modified dates
- Show: Both "Published" and "Modified" dates
- Highlight: Different date types, time ago
- Size: 1280x800

### Screenshot 4: Wayback Machine (Recommended)
- Site: Any site (or example.com)
- Show: "Check Archive" button and result
- Highlight: Archive.org integration
- Size: 1280x800

### Screenshot 5: International Support (Optional)
- Site: Deutsche Welle or Le Monde
- Show: European date format (DD.MM.YYYY)
- Highlight: Multi-language capability
- Size: 1280x800

## How to Load Extension for Testing

### Chrome
```bash
# Open Chrome
# Navigate to: chrome://extensions/
# Enable "Developer mode" (top right toggle)
# Click "Load unpacked"
# Select: /Users/lazar/date-detective-addon/build-chrome
```

### Firefox
```bash
# Open Firefox
# Navigate to: about:debugging#/runtime/this-firefox
# Click "Load Temporary Add-on"
# Select: /Users/lazar/date-detective-addon/manifest.json
```

## Screenshot Tips

1. **Clean up your browser**: Hide bookmarks bar, close unnecessary tabs
2. **Use incognito/private mode**: No other extensions interfering
3. **Crop carefully**: Focus on the extension popup
4. **Show context**: Include a bit of the website so reviewers see it working
5. **Good lighting**: Clear, readable text
6. **Highlight key features**: Circle or arrow to point out confidence indicators

## macOS Screenshot Commands
```bash
# Full screen
Cmd + Shift + 3

# Selection
Cmd + Shift + 4

# Window
Cmd + Shift + 4, then press Space, then click window
```

## Resize Screenshots (if needed)
```bash
# Using ImageMagick (install with: brew install imagemagick)
magick screenshot.png -resize 1280x800 screenshot-resized.png

# Or use Preview.app:
# Tools → Adjust Size → Enter 1280 width, maintain aspect ratio
```

## Store Screenshot Folder
Create a folder to organize your screenshots:
```bash
mkdir screenshots
# Save all screenshots as: screenshot-1.png, screenshot-2.png, etc.
```
