# Browser Compatibility Guide

Publishing Date Finder is available for both Firefox and Chrome (including Edge, Brave, Opera, and other Chromium-based browsers).

## 📦 Available Packages

### Firefox (.xpi)
- **File**: `publishing_date_finder-1.2.5.xpi`
- **Manifest**: v2 (Firefox standard)
- **API**: `browser.*` (WebExtension)
- **Installation**: Direct .xpi or Firefox Add-ons Store

### Chrome (.zip)
- **File**: `publishing-date-finder-chrome-v1.2.5.zip`
- **Manifest**: v3 (Chrome requirement)
- **API**: `chrome.*` (Chrome Extension)
- **Installation**: Chrome Web Store or manual unpacked

## 🔧 Technical Differences

| Feature | Firefox | Chrome |
|---------|---------|--------|
| Manifest Version | 2 | 3 |
| API Namespace | `browser` | `chrome` |
| Background Script | Persistent script | Service worker |
| Permissions | Combined | Split (permissions + host_permissions) |
| Action API | `browser_action` | `action` |
| Icons Required | 48px, 96px | 48px, 96px, 128px |

## 🏗️ Building

### Firefox Build
```bash
# Already built - just use existing files
# To sign for self-hosting:
web-ext sign \
  --api-key="YOUR_KEY" \
  --api-secret="YOUR_SECRET" \
  --channel=unlisted
```

### Chrome Build
```bash
# Run the build script
./build-chrome.sh

# Output: publishing-date-finder-chrome-v1.2.5.zip
```

## 📝 Source Files

### Shared (Both Browsers)
- `content.js` - Content script (runs on pages)
- `popup/popup.html` - Popup UI
- `popup/popup.css` - Popup styling
- `icons/` - Extension icons

### Firefox-Specific
- `manifest.json` - Firefox manifest (v2)
- `background.js` - Background script (browser.*)
- `popup/popup.js` - Popup script (browser.*)

### Chrome-Specific
- `manifest-chrome.json` - Chrome manifest (v3)
- `background-chrome.js` - Service worker (chrome.*)
- `popup-chrome.js` - Popup script (chrome.*)

## 🚀 Testing Locally

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json`

### Chrome
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `build-chrome/` folder (after running build script)

## 📤 Publishing

### Firefox Add-ons
- **Guide**: See `FIREFOX_SUBMISSION.md` (if exists)
- **Store**: https://addons.mozilla.org/developers/
- **Review Time**: Minutes to hours (automated + manual)
- **Cost**: Free

### Chrome Web Store
- **Guide**: See `CHROME_SUBMISSION.md`
- **Store**: https://chrome.google.com/webstore/devconsole
- **Review Time**: 1-3 business days
- **Cost**: $5 one-time developer fee

## 🔄 Updates

### Updating Version
1. Bump version in **both** manifests:
   - `manifest.json` (Firefox)
   - `manifest-chrome.json` (Chrome)
2. Update version badge in `popup/popup.html`
3. Update CHANGELOG.md

### Building New Release

**Firefox**:
```bash
# Sign new version
web-ext sign --api-key="..." --api-secret="..." --channel=unlisted

# Upload to GitHub
gh release create v1.2.6 web-ext-artifacts/*.xpi
```

**Chrome**:
```bash
# Build package
./build-chrome.sh

# Upload to GitHub
gh release upload v1.2.6 publishing-date-finder-chrome-v1.2.6.zip

# Or upload to Chrome Web Store dashboard
```

## 🌐 Self-Hosting

### Firefox
Users can install the signed `.xpi` directly:
```
https://github.com/Popravljam/publishing-date-finder/releases/download/v1.2.4/publishing_date_finder-1.2.5.xpi
```
✅ No warnings, auto-updates possible with update manifest

### Chrome
Users must load unpacked (shows developer warning):
1. Download and extract zip
2. Load unpacked in chrome://extensions/
3. ⚠️ Warning banner appears but extension works

To avoid warning, must publish to Chrome Web Store.

## 🧪 Cross-Browser Compatibility

The extension works identically in both browsers. Only the API wrappers differ:

**Firefox**: Uses native `browser.*` Promise-based API  
**Chrome**: Uses `chrome.*` callback-based API (also supports Promises in newer versions)

All business logic in `content.js` is shared and browser-agnostic.

## 📚 Resources

- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V2 to V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [WebExtension Browser API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
