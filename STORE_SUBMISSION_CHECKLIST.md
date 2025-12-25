# Store Submission Checklist

Complete guide for submitting Publishing Date Finder to Chrome Web Store and Firefox Add-ons.

## 📦 Packages Ready

- ✅ **Firefox**: `web-ext-artifacts/publishing_date_finder-1.2.5.xpi`
- ✅ **Chrome**: `publishing-date-finder-chrome-v1.2.5.zip`

---

## 🦊 Firefox Add-ons Submission

### Account Setup
- [ ] Create Mozilla account at https://addons.mozilla.org/
- [ ] Accept Firefox Add-on Developer Agreement

### Assets Needed
- [ ] **Screenshots** (at least 1, recommended 3-5)
  - Format: PNG or JPG
  - Size: Minimum 1280x800 pixels
  - Max file size: 8 MB each
  - Show: Extension popup, date detection, confidence indicators, Wayback feature
- [ ] **Icon**: Use `icons/icon-96.png` (already exists)

### Listing Information

**Name**: Publishing Date Finder

**Add-on URL**: `publishing-date-finder` (or your preferred slug)

**Summary** (250 chars max):
```
Detects publication dates from web pages using 8 detection methods with confidence indicators. Perfect for journalists, researchers, and fact-checkers. Multi-language support, smart filtering, no data collection.
```

**Description**:
```
Publishing Date Finder helps journalists, researchers, and anyone who needs to verify when web content was published.

✨ KEY FEATURES

• 8 Detection Methods: Open Graph metadata, JSON-LD, microdata, HTML time elements, URL patterns, text heuristics, and Wayback Machine integration
• Confidence Scoring: Color-coded indicators (high/medium/low) show reliability
• Smart Content Filtering: Automatically excludes dates from sidebars, related articles, and navigation
• Multi-Language Support: 10+ languages including English, Spanish, German, French, Portuguese, Russian, Arabic, Japanese, Hindi, and Mandarin
• International Date Formats: DD.MM.YYYY, MM/DD/YYYY, DD-MM-YYYY, ISO 8601, YYYYMMDD
• Wayback Machine Integration: Check archived versions for undated pages

🎯 PERFECT FOR

• Journalists verifying source material
• Researchers documenting content
• Fact-checkers validating information
• Anyone who needs to know when content was published

🔒 PRIVACY FOCUSED

No data collection. No tracking. No external servers (except optional Wayback Machine lookup). Your browsing stays completely private.

📖 HOW TO USE

1. Navigate to any web page (news article, blog post, etc.)
2. Click the Date Detective icon in your toolbar
3. View detected dates with confidence indicators
4. See the source/method used for each date
5. Click "Check Archive" for Wayback Machine lookup

The extension prioritizes authoritative metadata sources over heuristic detection and intelligently filters out dates from page periphery content.

Open source project: https://github.com/Popravljam/publishing-date-finder
```

**Categories**:
- Primary: Productivity
- Secondary: News & Blogs

**Tags**:
```
date-detection, publication-date, metadata, journalism, research, fact-checking, wayback-machine, web-archive, news, blog, article-analysis
```

**Version Notes (v1.2.5)**:
```
Cross-browser release with Chrome/Chromium support

New in v1.2.5:
• Full Chrome, Edge, Brave, Opera compatibility (Manifest V3)
• Self-hosted signed packages for both browsers
• Enhanced documentation for cross-browser deployment

Features:
• 8 detection methods with confidence scoring
• Smart content filtering (excludes sidebars, navigation)
• 10-language support with international date formats
• Wayback Machine integration
• Privacy-focused (no data collection)
```

**License**: MIT License
- URL: https://github.com/Popravljam/publishing-date-finder/blob/main/LICENSE

**Privacy Policy**: 
- URL: https://github.com/Popravljam/publishing-date-finder/blob/main/PRIVACY.md

**Support Information**:
- Homepage: https://github.com/Popravljam/publishing-date-finder
- Support Site: https://github.com/Popravljam/publishing-date-finder/issues
- Support Email: (your email)

### Submission Steps
- [ ] Go to https://addons.mozilla.org/developers/addon/submit/distribution
- [ ] Upload `web-ext-artifacts/publishing_date_finder-1.2.5.xpi`
- [ ] Fill out all listing information above
- [ ] Upload screenshots and icon
- [ ] Review and submit
- [ ] Wait for review (typically 1-7 days)

---

## 🌐 Chrome Web Store Submission

### Account Setup
- [ ] Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [ ] Sign in with Google account
- [ ] Pay $5 one-time developer registration fee
- [ ] Complete developer profile

### Assets Needed
- [ ] **Screenshots** (at least 1, recommended 3-5)
  - Format: PNG or JPG
  - Size: 1280x800 or 1920x1080
  - Show: Extension popup, date detection, confidence indicators, Wayback feature

- [ ] **Promotional Images** (Optional but highly recommended)
  - Small tile: 440x280 pixels
  - Marquee: 1400x560 pixels
  - Suggested design: Icon + "Publishing Date Finder" text with feature highlights

### Listing Information

**Item name**: Publishing Date Finder

**Summary** (132 characters max):
```
Detects publication dates with smart filtering and confidence scoring. Perfect for journalists and researchers.
```

**Description**:
```
Publishing Date Finder automatically detects and displays publication dates from web pages using multiple detection methods with confidence indicators.

✨ KEY FEATURES

• 8 Detection Methods: Open Graph metadata, JSON-LD, microdata, HTML time elements, URL patterns, text heuristics, and Wayback Machine
• Confidence Scoring: High/Medium/Low indicators show reliability
• Smart Content Filtering: Excludes dates from sidebars, related articles, and navigation
• Multi-Language Support: 10+ languages including English, Spanish, German, French, Portuguese, Russian, Arabic, Japanese, Hindi, and Mandarin
• International Date Formats: Recognizes DD.MM.YYYY, MM/DD/YYYY, ISO 8601, and more
• Wayback Machine Integration: Check archived versions when dates aren't available

🎯 PERFECT FOR

• Journalists verifying source material
• Researchers documenting content
• Fact-checkers validating information
• Anyone who needs to know when content was published

🔒 PRIVACY

No data collection. No tracking. Your browsing stays private. See our privacy policy for details.

📖 HOW IT WORKS

1. Click the extension icon on any web page
2. View detected dates with confidence indicators
3. See the detection method and source for each date
4. Use the Wayback Machine fallback for undated pages

The extension prioritizes authoritative metadata (Open Graph, JSON-LD) over heuristic detection, and intelligently filters out dates from related articles and sidebar content.

Open source: https://github.com/Popravljam/publishing-date-finder
```

**Category**: Productivity

**Language**: English

### Privacy Practices

**Single Purpose Description**:
```
This extension detects and displays publication dates from web pages.
```

**Permission Justifications**:
- **activeTab**: "Required to analyze the current page content and extract publication dates from HTML, metadata, and structured data"
- **https://archive.org/***: "Optional feature allowing users to query the Wayback Machine for archived page snapshots when publication dates are not found on the current page"

**Data Usage**: 
- Select: "Does not collect or use user data"
- No data is transmitted, stored, or collected
- All processing happens locally in the browser

### Privacy Questionnaire
- Data Collection: **No**
- Personally Identifiable Information: **None**
- Health Information: **None**
- Financial Information: **None**
- Authentication Information: **None**
- Personal Communications: **None**
- Location: **None**
- Web History: **None**
- User Activity: **None**
- Website Content: **Read-only access to extract dates (not transmitted)**

### Additional Fields
- **Official URL**: https://github.com/Popravljam/publishing-date-finder
- **Support URL**: https://github.com/Popravljam/publishing-date-finder/issues
- **Support Email**: (your email address)

### Submission Steps
- [ ] Click **"New Item"** in Chrome Web Store Dashboard
- [ ] Upload `publishing-date-finder-chrome-v1.2.5.zip`
- [ ] Fill out all listing information above
- [ ] Upload screenshots (and promotional images if available)
- [ ] Complete privacy practices section
- [ ] Review all information
- [ ] Submit for review
- [ ] Wait for approval (typically 1-3 business days)

---

## 📸 Creating Screenshots

### Recommended Screenshots (for both stores):

1. **Main Popup** - Extension popup showing detected dates with confidence indicators
2. **News Article Example** - Extension working on a real news article (BBC, CNN, etc.)
3. **Multiple Dates** - Page showing published, modified, and created dates
4. **Wayback Machine** - The Wayback Machine feature in action
5. **Low/High Confidence** - Examples of different confidence levels

### How to Capture:

**On Chrome:**
1. Load unpacked extension: `chrome://extensions/` → Enable Developer mode → Load unpacked → Select `build-chrome` folder
2. Visit a news article (e.g., https://www.bbc.com/news)
3. Click extension icon
4. Use Cmd+Shift+4 (Mac) or Windows Snipping Tool to screenshot
5. Resize to 1280x800 if needed

**On Firefox:**
1. Load temporary add-on: `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → Select `manifest.json`
2. Visit a news article
3. Click extension icon
4. Take screenshot with browser tools or OS screenshot utility
5. Resize to 1280x800

### Suggested Test Sites:
- https://www.bbc.com/news (any article)
- https://www.cnn.com (any article)
- https://techcrunch.com (any article)
- https://medium.com (any article)
- https://www.bundeswehr.de (German site, for international support demo)

---

## 🚀 After Approval

### Firefox
Your add-on will be live at:
```
https://addons.mozilla.org/firefox/addon/publishing-date-finder/
```

### Chrome
Your extension will be live at:
```
https://chromewebstore.google.com/detail/publishing-date-finder/YOUR_EXTENSION_ID
```

### Next Steps After Publication
- [ ] Update `README.md` with official store URLs
- [ ] Remove "Coming soon" text from installation sections
- [ ] Add store badges to README
- [ ] Share on social media and relevant communities
- [ ] Monitor user reviews and respond promptly
- [ ] Set up GitHub releases for future versions

---

## ⏱️ Expected Timeline

| Store | Review Time | Publication |
|-------|-------------|-------------|
| Firefox | 1-7 days | Usually within 24-48 hours |
| Chrome | 1-3 business days | Immediate after approval |

---

## 🆘 Troubleshooting

### Common Issues

**Firefox:**
- "Missing or unclear privacy policy" → Ensure PRIVACY.md link is correct
- "Unclear permission justifications" → Explain activeTab for content analysis

**Chrome:**
- "Manifest file is invalid" → Ensure you're uploading the Chrome package (not Firefox)
- "Permissions are too broad" → Provide clear justifications in submission form
- "Need more screenshots" → Minimum 1 required, but 3-5 recommended

### Resources
- Firefox: https://extensionworkshop.com/
- Chrome: https://developer.chrome.com/docs/webstore/
- Support: https://github.com/Popravljam/publishing-date-finder/issues

---

## ✅ Pre-Submission Checklist

### Both Stores
- [ ] Extension tested on multiple websites
- [ ] All features working (date detection, Wayback Machine, confidence scoring)
- [ ] No console errors
- [ ] Privacy policy accessible
- [ ] LICENSE file accessible
- [ ] Screenshots prepared
- [ ] Support email/URL ready

### Firefox Specific
- [ ] `.xpi` file ready in `web-ext-artifacts/`
- [ ] Mozilla account created
- [ ] Icon file ready (`icons/icon-96.png`)

### Chrome Specific
- [ ] `.zip` file ready (`publishing-date-finder-chrome-v1.2.5.zip`)
- [ ] Google account ready
- [ ] $5 registration fee ready
- [ ] Promotional images prepared (optional)

---

Good luck with your submissions! 🎉
