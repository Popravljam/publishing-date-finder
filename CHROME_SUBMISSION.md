# Chrome Web Store Submission Guide

## Prerequisites

1. **Google Account**: You need a Google account
2. **Developer Fee**: One-time $5 registration fee
3. **Package**: `publishing-date-finder-chrome-v1.2.5.zip` (already built)

## Step 1: Register as Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Accept the terms and pay the $5 registration fee
4. Complete your developer profile

## Step 2: Create New Item

1. Click **"New Item"** button
2. Upload `publishing-date-finder-chrome-v1.2.5.zip`
3. Click **"Upload"**

## Step 3: Fill Store Listing

### Basic Information

**Item name**: Publishing Date Finder

**Summary** (132 characters max):
```
Detects publication dates from web pages with smart filtering and confidence scoring. Perfect for journalists and researchers.
```

**Description**:
```
Publishing Date Finder automatically detects and displays publication dates from web pages using multiple detection methods with confidence indicators.

✨ KEY FEATURES

• 8 Detection Methods: Open Graph metadata, JSON-LD, microdata, HTML time elements, URL patterns, and more
• Confidence Scoring: High/Medium/Low indicators for reliability
• Smart Content Filtering: Excludes dates from sidebars, related articles, and navigation
• Multi-Language Support: 10+ languages including English, Spanish, German, French, Russian, Arabic, Japanese, Hindi, and Mandarin
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
```

**Category**: Productivity

**Language**: English

### Privacy

**Single Purpose Description**:
```
This extension detects and displays publication dates from web pages.
```

**Permission Justifications**:
- **activeTab**: "Required to analyze the current page content and extract publication dates"
- **https://archive.org/***: "Optional feature to check Wayback Machine for archived versions when no date is found"

**Data Usage**: Select "Does not collect or use user data"

### Store Listing Assets

#### Screenshots (1280x800 or 1920x1080, at least 1 required)
You'll need to create screenshots showing:
1. Extension popup with detected dates
2. Extension working on a news article
3. Wayback Machine feature (optional)

To create screenshots:
1. Load unpacked extension in Chrome (chrome://extensions/)
2. Visit a news article (BBC, CNN, etc.)
3. Click extension icon
4. Take screenshot (Cmd+Shift+4 on Mac, crop to popup)
5. Resize to 1280x800 if needed

#### Promotional Images (Optional but recommended)

**Small tile** (440x280):
- Simple icon + "Publishing Date Finder" text
- Background color: #2c3e50

**Marquee** (1400x560):
- Hero image with feature highlights
- "Find Publication Dates Instantly"

You can create these with any image editor or Figma.

### Additional Fields

**Official URL**: https://github.com/Popravljam/publishing-date-finder

**Support URL**: https://github.com/Popravljam/publishing-date-finder/issues

**Support Email**: (your email address)

## Step 4: Privacy Practices

1. **Data Collection**: Select "No"
2. **Personally Identifiable Information**: None
3. **Health Information**: None
4. **Financial Information**: None
5. **Authentication Information**: None
6. **Personal Communications**: None
7. **Location**: None
8. **Web History**: None
9. **User Activity**: None
10. **Website Content**: Read-only access to extract dates

## Step 5: Submit for Review

1. Review all information
2. Click **"Submit for review"**
3. Wait for approval (typically 1-3 business days)

## Review Process

### What Chrome Checks:
- ✅ No malware or malicious code
- ✅ Permissions match functionality
- ✅ Privacy policy is accurate
- ✅ Description matches functionality
- ✅ No prohibited content

### Your Extension Should Pass Because:
- ✅ Simple, focused functionality
- ✅ No data collection
- ✅ Minimal permissions
- ✅ Open source
- ✅ Well-documented

## After Approval

Your extension will be published at:
```
https://chromewebstore.google.com/detail/publishing-date-finder/YOUR_EXTENSION_ID
```

Users can install with one click!

## Updating

To publish updates:
1. Bump version in `manifest-chrome.json`
2. Run `./build-chrome.sh`
3. Upload new zip to existing item in dashboard
4. Submit for review

## Self-Hosting Alternative

If you prefer not to publish to Chrome Web Store, users can:

1. Download `publishing-date-finder-chrome-v1.2.5.zip`
2. Extract it
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extracted folder

**Note**: Self-hosted extensions show a warning banner in Chrome and don't auto-update.

## Troubleshooting

### "Manifest file is invalid"
- Ensure you're using the Chrome package, not the Firefox one
- Manifest V3 is required for new submissions

### "Permissions are too broad"
- All permissions are justified and minimal
- Include clear justifications in the submission form

### "Need more screenshots"
- Minimum 1 screenshot required
- Recommended: 3-5 showing different features

## Resources

- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Extension Development Guide](https://developer.chrome.com/docs/extensions/mv3/)
- [Publishing Checklist](https://developer.chrome.com/docs/webstore/publish/)
