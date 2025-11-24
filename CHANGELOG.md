# Changelog

All notable changes to Publishing Date Finder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2025-11-24 (Beta)

### Added
- **Main article content detection**: Prioritizes dates within `<article>`, `<main>` tags and semantic content areas
- Smart confidence scoring: Only the first date in main article gets HIGH confidence
- Increased DOM traversal depth from 10 to 15 levels for better detection

### Improved
- **Selective high confidence**: Only first main article date or explicitly marked "published" dates get green badge
- Subsequent dates in same article get yellow (medium) confidence to prevent false positives
- Better accuracy on BBC Serbian and other complex news sites with multiple article dates

### Fixed
- Prevents multiple incorrect dates from showing high confidence
- Correctly identifies and prioritizes main article publication dates over sidebar content

## [1.2.1] - 2025-11-24

### Improved
- **Enhanced BBC and news site filtering**: Added detection for `data-testid` and `data-component` attributes commonly used by BBC and other major news sites
- **40+ exclusion patterns**: Expanded from initial list to over 40 comprehensive patterns including BBC-specific ones (story-promo, media-list, top-story)
- **Multi-date container detection**: Automatically filters containers with 3+ date elements (article lists, recommended sections)
- **Better carousel/grid detection**: Added filtering for sliders, carousels, tiles, and card-lists
- **More sidebar variations**: Catches read-more, you-may-like, continue-reading, and similar patterns

### Fixed
- Significantly reduced false positives from BBC Serbian and other BBC sites
- Better filtering of "related articles" and "top stories" sections
- Improved accuracy on news sites with complex layouts

## [1.2.0] - 2025-11-24

### Improved
- **Smart content filtering**: Time elements and microdata from sidebars, recommended articles, and navigation are now excluded
- Added `isInExcludedArea()` helper that checks parent elements for common sidebar/recommendation patterns
- Reduces false positives from dates in "related articles", "trending", "popular posts" sections
- Checks ARIA roles and semantic HTML tags (`<aside>`) for better accuracy

### Fixed
- Extension now focuses on main article content, ignoring dates from page periphery
- Improved accuracy on news sites and blogs with multiple article dates on the same page

## [1.1.0] - 2025-11-24

### Added
- Extension ID and data collection permissions declaration for Firefox Add-ons compliance
- Comprehensive project documentation (LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, PRIVACY.md)
- GitHub repository with full open-source setup
- Firefox Add-ons submission guide

### Changed
- Replaced all `innerHTML` usage with safe DOM manipulation methods for improved security
- Updated UI to use monochromatic header background (#2c3e50)
- Changed version badge from "v1.0 beta" to "v1.1"
- Updated README with badges and improved structure

### Security
- Fixed XSS vulnerability by eliminating unsafe `innerHTML` assignments
- All dynamic content now uses `createElement()` and `textContent` for safe DOM manipulation

## [1.0.0] - 2025-11-24

### Added
- Initial release
- Core date detection with 8 different methods:
  - Open Graph metadata
  - JSON-LD structured data
  - HTML meta tags (Dublin Core, etc.)
  - Microdata (itemprop attributes)
  - HTML time elements
  - URL pattern analysis
  - Text heuristics
  - Wayback Machine integration
- Confidence indicators (high/medium/low) for each detected date
- Modern popup UI with visual feedback
- Wayback Machine integration for undated pages
- Privacy-focused design with no data collection
- Custom logo with magnifying glass and clock icon

[1.2.3]: https://github.com/Popravljam/publishing-date-finder/compare/v1.2.1...v1.2.3
[1.2.1]: https://github.com/Popravljam/publishing-date-finder/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/Popravljam/publishing-date-finder/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Popravljam/publishing-date-finder/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Popravljam/publishing-date-finder/releases/tag/v1.0.0
