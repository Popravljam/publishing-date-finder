# Release Notes - v1.2.5

**Release Date**: November 24, 2024

## 🎉 Major Release: Cross-Browser Support

Publishing Date Finder is now available for **all major browsers**! This release brings full Chrome/Chromium support alongside the existing Firefox version.

---

## 🌐 Supported Browsers

### Now Available For:
- ✅ **Firefox** 57+ (Manifest v2)
- ✅ **Chrome** 88+ (Manifest v3)
- ✅ **Microsoft Edge** 88+ (Manifest v3)
- ✅ **Brave** Browser (Latest)
- ✅ **Opera** (Latest)
- ✅ **All Chromium-based browsers**

---

## 📦 Installation Options

### Firefox
**Direct Install (Recommended)**
- Download: [publishing_date_finder-1.2.5.xpi](https://github.com/Popravljam/publishing-date-finder/releases/download/v1.2.4/publishing_date_finder-1.2.5.xpi)
- One-click installation, no warnings
- Signed by Mozilla for security

**Coming Soon**: Firefox Add-ons Store listing

### Chrome / Chromium Browsers
**Self-Hosted Install**
- Download: [publishing-date-finder-chrome-v1.2.5.zip](https://github.com/Popravljam/publishing-date-finder/releases/download/v1.2.4/publishing-date-finder-chrome-v1.2.5.zip)
- Extract and load unpacked in `chrome://extensions/`
- Shows developer mode banner (safe to ignore)

**Coming Soon**: Chrome Web Store listing

---

## ✨ What's New

### Cross-Browser Architecture
- **Manifest V3** implementation for Chrome compliance
- **Service worker** background script for Chrome (replaces persistent background page)
- **Shared codebase** - 95% of code works across all browsers
- **Browser-specific API wrappers** handle Firefox vs Chrome differences

### Self-Hosting Support
- **Firefox**: Signed .xpi available for direct installation from GitHub
- **Chrome**: Packaged .zip ready for manual installation or Chrome Web Store submission
- **Automated builds**: Scripts for both Firefox signing and Chrome packaging

### Documentation
- **CHROME_SUBMISSION.md**: Complete Chrome Web Store submission guide
- **BROWSER_GUIDE.md**: Technical compatibility reference for developers
- **Updated README**: Installation instructions for all browsers
- **Enhanced CHANGELOG**: Full version history with cross-browser updates

---

## 🔧 Technical Details

### Firefox Build
- **Manifest**: v2 (Firefox standard)
- **API**: `browser.*` (WebExtension Promise-based)
- **Background**: Persistent background script
- **Package**: Signed .xpi (41KB)

### Chrome Build
- **Manifest**: v3 (Chrome requirement)
- **API**: `chrome.*` (Chrome Extension callback-based)
- **Background**: Service worker (non-persistent)
- **Package**: Unsigned .zip (31KB)

### Shared Components
- `content.js` - Date detection logic (browser-agnostic)
- `popup.html` / `popup.css` - User interface
- `icons/` - Extension icons
- All documentation and metadata

---

## 🚀 Features (All Browsers)

### Smart Date Detection
- **8 detection methods**: Open Graph, JSON-LD, meta tags, microdata, time elements, URL patterns, text heuristics, Wayback Machine
- **Confidence scoring**: High/Medium/Low indicators for reliability
- **Smart filtering**: Excludes dates from sidebars, related articles, navigation

### International Support
- **10 languages**: English, Spanish, French, German, Portuguese, Russian, Japanese, Hindi, Arabic, Mandarin
- **Multiple date formats**: DD.MM.YYYY, MM/DD/YYYY, DD-MM-YYYY, ISO 8601, YYYYMMDD
- **Unicode support**: CJK, Devanagari, Arabic, Cyrillic scripts

### Content Intelligence
- **Open Graph prioritization**: Trusts publisher metadata over HTML elements
- **Position-based confidence**: Bottom-page dates marked as low confidence
- **Link filtering**: Ignores dates within clickable links to other articles
- **Main content detection**: Focuses on article, not surrounding content

---

## 📝 Migration Notes

### For Existing Firefox Users
No action needed! Your existing installation continues to work. If you installed temporarily, upgrade to the signed .xpi for permanent installation.

### For New Chrome Users
Follow the Chrome installation guide in the README. The extension works identically to Firefox - same features, same UI, same detection accuracy.

### For Developers
- Repository structure unchanged - both builds from same source
- Run `./build-chrome.sh` to create Chrome package
- See BROWSER_GUIDE.md for technical details on browser differences

---

## 🔄 Upgrade from v1.2.4

### What Changed
- No functionality changes to date detection
- Same features across all browsers
- Chrome/Chromium support added
- Enhanced documentation

### Version Numbers
- Firefox: v1.2.5 (from v1.2.4)
- Chrome: v1.2.5 (new)

---

## 🐛 Bug Fixes

No new bugs fixed in this release. All v1.2.4 features and fixes carry forward:
- ✅ Bundeswehr and BBC duplicate date filtering
- ✅ German news site support
- ✅ International date format detection
- ✅ Position-based confidence scoring

---

## 📚 Documentation Updates

### New Files
- `CHROME_SUBMISSION.md` - Chrome Web Store submission guide
- `BROWSER_GUIDE.md` - Cross-browser technical reference
- `RELEASE_NOTES.md` - This file

### Updated Files
- `README.md` - Multi-browser installation instructions
- `CHANGELOG.md` - Full v1.2.5 changelog entry
- `manifest-chrome.json` - Chrome Manifest V3 configuration
- `background-chrome.js` - Chrome service worker
- `popup-chrome.js` - Chrome popup script
- `build-chrome.sh` - Chrome build automation
- `web-ext-config.cjs` - Build exclusions
- `.gitignore` - Build artifact exclusions

---

## 🎯 Distribution Status

### Self-Hosting (Available Now)
- ✅ Firefox signed .xpi on GitHub Releases
- ✅ Chrome unsigned .zip on GitHub Releases
- ✅ Direct download links in README

### Official Stores (Coming Soon)
- ⏳ Firefox Add-ons Store submission pending
- ⏳ Chrome Web Store submission pending

---

## 💡 For Store Publishers

### Firefox Add-ons Submission
1. Already have signed .xpi
2. Upload to https://addons.mozilla.org/developers/
3. Fill store listing (see existing README for descriptions)
4. Should be approved within hours

### Chrome Web Store Submission
1. Register developer account ($5 one-time fee)
2. Upload `publishing-date-finder-chrome-v1.2.5.zip`
3. Follow CHROME_SUBMISSION.md guide
4. Review takes 1-3 business days

---

## 🙏 Acknowledgments

Built with ❤️ for journalists, researchers, and fact-checkers who need to verify when content was published.

Special thanks to the open-source community for browser extension standards and documentation.

---

## 📞 Support

- **Issues**: https://github.com/Popravljam/publishing-date-finder/issues
- **Documentation**: See README.md, BROWSER_GUIDE.md, CHROME_SUBMISSION.md
- **Privacy Policy**: PRIVACY.md
- **Contributing**: CONTRIBUTING.md

---

## 🔗 Links

- **GitHub Repository**: https://github.com/Popravljam/publishing-date-finder
- **Firefox Package**: [publishing_date_finder-1.2.5.xpi](https://github.com/Popravljam/publishing-date-finder/releases/download/v1.2.4/publishing_date_finder-1.2.5.xpi)
- **Chrome Package**: [publishing-date-finder-chrome-v1.2.5.zip](https://github.com/Popravljam/publishing-date-finder/releases/download/v1.2.4/publishing-date-finder-chrome-v1.2.5.zip)
- **Release Page**: https://github.com/Popravljam/publishing-date-finder/releases/tag/v1.2.4

---

## ⏭️ Next Steps

1. **Try it out**: Download for your browser and test on various websites
2. **Report bugs**: Open issues on GitHub if you find problems
3. **Contribute**: See CONTRIBUTING.md for development guidelines
4. **Spread the word**: Share with journalists, researchers, and anyone who needs publication date verification

Thank you for using Publishing Date Finder! 🎉
