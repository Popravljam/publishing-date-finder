# Firefox Add-on Submission Guide

This guide will help you submit **Publishing Date Finder** to the Mozilla Firefox Add-on store.

## Prerequisites

1. Mozilla account (create at https://addons.mozilla.org/)
2. The distribution package: `publishing-date-finder-v1.0-beta.zip`

## Submission Steps

### 1. Create Developer Account
- Go to https://addons.mozilla.org/
- Sign in or create a Mozilla account
- Accept the Firefox Add-on Developer Agreement

### 2. Submit New Add-on
- Go to https://addons.mozilla.org/developers/addon/submit/distribution
- Click "Submit a New Add-on"
- Choose "On this site" for distribution

### 3. Upload Your Add-on
- Upload `publishing-date-finder-v1.0-beta.zip`
- Mozilla will automatically validate the package
- Fix any validation errors if they appear

### 4. Fill Out Listing Information

#### Basic Information
- **Name:** Publishing Date Finder
- **Add-on URL:** publishing-date-finder (or your preferred slug)
- **Summary:** Detects publication dates from web pages using multiple detection methods with confidence indicators
- **Description:**
```
Publishing Date Finder helps journalists, researchers, and anyone who needs to verify when web content was published.

Features:
• Multiple detection methods (Open Graph, JSON-LD, meta tags, microdata, time elements)
• Confidence indicators (high/medium/low) for each detected date
• Wayback Machine integration for undated pages
• Clean, intuitive interface
• Privacy-focused: no data collection

Perfect for fact-checking, research, and content verification.
```

#### Categories
- **Primary:** Productivity
- **Secondary:** Developer Tools (optional)

#### Tags
- date detection
- publication date
- metadata
- journalism
- research
- fact-checking
- web archive
- wayback machine

#### Version Notes (for v1.0 beta)
```
Initial beta release

Features:
- Core date detection with 8 different methods
- Confidence indicators for reliability assessment
- Wayback Machine integration
- Modern UI with visual feedback
- Privacy-focused design (no data collection)

Known limitations:
- Beta release, feedback welcome
- Limited support for non-English date formats
```

### 5. Privacy Policy
- Link to the privacy policy in your GitHub repo:
  `https://github.com/Popravljam/publishing-date-finder/blob/main/PRIVACY.md`
- Or paste the contents of `PRIVACY.md`

### 6. License
- Select: **MIT License**
- Add link: `https://github.com/Popravljam/publishing-date-finder/blob/main/LICENSE`

### 7. Support Information
- **Support Site:** `https://github.com/Popravljam/publishing-date-finder`
- **Support Email:** Your email address (optional)
- **Homepage:** `https://github.com/Popravljam/publishing-date-finder`

### 8. Upload Screenshots (Required)

You'll need to provide screenshots showing:
1. The extension popup with detected dates
2. The Wayback Machine feature
3. Confidence indicators in action

**Screenshot Specifications:**
- Format: PNG or JPG
- Size: At least 1280x800 pixels (or 640x400 for mobile)
- Max file size: 8 MB each
- Need: 1-10 screenshots

**To capture screenshots:**
1. Load the extension in Firefox
2. Visit a news article
3. Click the extension icon
4. Take screenshots showing different features

### 9. Upload Icon (Required)
Use the file: `icons/icon-96.png` (or larger if available)
- Size: 128x128 pixels recommended
- Format: PNG

### 10. Review & Submit
- Review all information
- Click "Submit Version"
- Wait for Mozilla review (usually 1-7 days)

## After Submission

### Review Process
- Automated validation (immediate)
- Manual review by Mozilla (1-7 days typically)
- You'll receive email notifications about the review status

### Common Review Issues
- Missing or unclear privacy policy
- Unclear permission justifications
- Minified/obfuscated code (yours is not)
- Missing source code (if using build tools - not applicable here)

### Updates
To submit an update:
1. Update the `version` field in `manifest.json`
2. Create a new ZIP file
3. Go to your add-on's page on addons.mozilla.org
4. Click "Upload New Version"

## Store Optimization Tips

### After Approval
1. Add a prominent icon/logo
2. Write a compelling description highlighting use cases
3. Respond to user reviews promptly
4. Update regularly with bug fixes and features
5. Promote on social media and relevant communities

### Marketing Suggestions
- Share on:
  - Reddit (r/firefox, r/privacy, r/opensource)
  - Hacker News
  - Twitter/X with #Firefox #Extension
  - Journalism/research communities
  
## Testing Before Submission

1. Test on various websites (news, blogs, etc.)
2. Test all features (date detection, Wayback Machine)
3. Check that all permissions are necessary
4. Verify no console errors
5. Test on different Firefox versions if possible

## Resources

- **Mozilla Add-on Policies:** https://extensionworkshop.com/documentation/publish/add-on-policies/
- **Developer Hub:** https://addons.mozilla.org/developers/
- **Extension Workshop:** https://extensionworkshop.com/
- **Review Process:** https://extensionworkshop.com/documentation/publish/add-on-review-process/

## Checklist

- [ ] Mozilla developer account created
- [ ] Add-on tested thoroughly
- [ ] Screenshots prepared (at least 1)
- [ ] Icon ready (128x128 recommended)
- [ ] Privacy policy URL ready
- [ ] Description and summary written
- [ ] Tags and categories selected
- [ ] ZIP file created and validated
- [ ] Version notes written
- [ ] Submitted for review

Good luck with your submission! 🚀
