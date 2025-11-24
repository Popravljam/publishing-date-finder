# Changelog

All notable changes to Publishing Date Finder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.1.0]: https://github.com/Popravljam/publishing-date-finder/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Popravljam/publishing-date-finder/releases/tag/v1.0.0
