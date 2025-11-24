# Date Detective - Quick Start Guide

## Installation (2 minutes)

### Step 1: Load the Addon
1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on..."** button
5. Navigate to this folder and select `manifest.json`
6. You should see "Date Detective" appear in the list ✓

### Step 2: Test It!
The addon icon should now appear in your Firefox toolbar.

## Quick Test

### Test Sites
Try these sites to see different detection methods:

1. **News Articles** (usually have good metadata)
   - https://www.bbc.com/news (any article)
   - https://www.nytimes.com (any article)
   - https://www.theguardian.com (any article)

2. **Blog Posts** (various quality)
   - https://medium.com (any article)
   - Any WordPress blog

3. **Technical Documentation** (may lack dates)
   - https://developer.mozilla.org
   - Try the Wayback Machine fallback

4. **Older Sites** (good for testing heuristics)
   - Any older blog or news site from 2000-2010

### How to Use
1. Navigate to any webpage
2. Click the Date Detective icon in the toolbar
3. See detected dates with color-coded confidence:
   - 🟢 **Green** = High confidence (structured metadata)
   - 🟡 **Yellow** = Medium confidence (heuristic detection)
   - 🔴 **Red** = Low confidence (estimated)
4. Click "Check Archive" for Wayback Machine data

## What You'll See

Each detected date shows:
- **Date/Time** - When the content was published/modified
- **Relative Time** - "3 days ago", "2 months ago", etc.
- **Source** - Which detection method found it
- **Confidence Badge** - High/Medium/Low reliability indicator

## Troubleshooting

### Icon doesn't appear
- Make sure the addon loaded successfully in `about:debugging`
- Look for any errors in the Browser Console (Ctrl+Shift+J)

### "Unable to analyze this page"
- Refresh the page and try again
- Some pages (like `about:` pages) can't be analyzed
- Check Browser Console for errors

### No dates found
- Some pages genuinely don't have dates
- Try the "Check Archive" button for Wayback Machine data
- The site might be blocking content scripts

### Wayback Machine not working
- Check your internet connection
- The Archive.org API might be temporarily down
- Some URLs might not be archived yet

## Development & Debugging

### View Console Logs
1. Open Browser Console: `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
2. Look for messages prefixed with "Date Detective"

### Inspect the Popup
1. Click the addon icon to open the popup
2. Right-click inside the popup
3. Choose "Inspect Element"
4. You can now debug the popup's HTML/CSS/JS

### Check Background Script
1. Go to `about:debugging`
2. Find "Date Detective" in the list
3. Click "Inspect" to open the background script console

### Reload After Changes
If you modify the code:
1. Go to `about:debugging`
2. Click "Reload" next to Date Detective
3. Or remove and re-add the addon

## Next Steps

### Customize It
- Edit `popup/popup.css` to change colors/styling
- Modify `content.js` to add new detection methods
- Update `manifest.json` to change name/description

### Test on Real Sites
- News sites from different countries
- Blogs in different languages
- Academic papers
- Social media posts
- Government websites

### Package for Distribution
```bash
cd date-detective-addon
zip -r -FS ../date-detective.xpi * --exclude '*.git*' --exclude '*README.md' --exclude '*QUICKSTART.md'
```

## Features Checklist

Test each detection method:
- [ ] Open Graph metadata (modern news sites)
- [ ] JSON-LD structured data (SEO-optimized sites)
- [ ] HTML meta tags (various CMS platforms)
- [ ] Microdata (older structured data)
- [ ] Time elements (modern blogs)
- [ ] URL patterns (date in URL like `/2024/11/24/`)
- [ ] Text heuristics (visible "Published:" text)
- [ ] Wayback Machine (archival fallback)

## Performance Notes

The addon is designed to be lightweight:
- Content script runs only when you click the icon
- Wayback Machine only queries when you click "Check Archive"
- Text search limited to first 5000 characters
- Results are cached during the session

## Privacy

The addon:
- ✅ Only analyzes pages you explicitly check
- ✅ Only sends URLs to Archive.org when you click "Check Archive"
- ✅ Doesn't collect or transmit your browsing data
- ✅ Doesn't track you
- ✅ Works completely offline (except Wayback Machine)

## Having Fun?

Share with friends who need to verify publication dates:
- Journalists fact-checking sources
- Researchers citing web content
- Students writing papers
- Anyone curious about when something was published

Enjoy! 📅
