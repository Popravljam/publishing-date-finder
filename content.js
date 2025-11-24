// Date Detective - Content Script
// Extracts publication dates from web pages using multiple methods

(function() {
  'use strict';

  const DateDetective = {
    CONFIDENCE: {
      HIGH: 'high',      // Green - structured metadata
      MEDIUM: 'medium',  // Yellow - heuristic but reliable
      LOW: 'low'         // Red - guesswork
    },

    // Method 1: Open Graph metadata
    extractOpenGraphDates() {
      const results = [];
      // Check og:datePublished first (highest priority)
      const ogDatePublished = document.querySelector('meta[property="og:datePublished"]');
      // Then check other published time variants
      const ogPublished = document.querySelector('meta[property="og:published_time"], meta[property="og:article:published_time"], meta[property="article:published_time"]');
      const ogModified = document.querySelector('meta[property="og:modified_time"], meta[property="og:article:modified_time"], meta[property="article:modified_time"]');

      // Prioritize og:datePublished
      if (ogDatePublished) {
        results.push({
          date: ogDatePublished.content,
          type: 'Published',
          source: 'Open Graph metadata (og:datePublished)',
          confidence: this.CONFIDENCE.HIGH
        });
      }
      
      if (ogPublished) {
        results.push({
          date: ogPublished.content,
          type: 'Published',
          source: 'Open Graph metadata',
          confidence: this.CONFIDENCE.HIGH
        });
      }

      if (ogModified) {
        results.push({
          date: ogModified.content,
          type: 'Modified',
          source: 'Open Graph metadata',
          confidence: this.CONFIDENCE.HIGH
        });
      }

      return results;
    },

    // Method 2: JSON-LD structured data
    extractJsonLdDates() {
      const results = [];
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');

      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          const items = Array.isArray(data) ? data : [data];

          items.forEach(item => {
            if (item['@type'] === 'Article' || item['@type'] === 'NewsArticle' || 
                item['@type'] === 'BlogPosting' || item['@type'] === 'WebPage') {
              
              if (item.datePublished) {
                results.push({
                  date: item.datePublished,
                  type: 'Published',
                  source: 'JSON-LD structured data',
                  confidence: this.CONFIDENCE.HIGH
                });
              }

              if (item.dateModified) {
                results.push({
                  date: item.dateModified,
                  type: 'Modified',
                  source: 'JSON-LD structured data',
                  confidence: this.CONFIDENCE.HIGH
                });
              }

              if (item.dateCreated) {
                results.push({
                  date: item.dateCreated,
                  type: 'Created',
                  source: 'JSON-LD structured data',
                  confidence: this.CONFIDENCE.HIGH
                });
              }
            }
          });
        } catch (e) {
          // Invalid JSON, skip
        }
      });

      return results;
    },

    // Method 3: HTML meta tags
    extractMetaTags() {
      const results = [];
      const metaSelectors = [
        { selector: 'meta[name="publish_date"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="article.published"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="date"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="DC.date.created"]', attr: 'content', type: 'Created' },
        { selector: 'meta[name="DC.date.issued"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="dcterms.created"]', attr: 'content', type: 'Created' },
        { selector: 'meta[name="dcterms.modified"]', attr: 'content', type: 'Modified' },
        { selector: 'meta[name="pubdate"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="publishdate"]', attr: 'content', type: 'Published' },
        { selector: 'meta[name="created"]', attr: 'content', type: 'Created' },
        { selector: 'meta[name="article_date_original"]', attr: 'content', type: 'Published' },
        { selector: 'meta[itemprop="datePublished"]', attr: 'content', type: 'Published' },
        { selector: 'time[itemprop="datePublished"]', attr: 'datetime', type: 'Published' },
      ];

      metaSelectors.forEach(({ selector, attr, type }) => {
        const element = document.querySelector(selector);
        if (element && element.getAttribute(attr)) {
          results.push({
            date: element.getAttribute(attr),
            type: type,
            source: `Meta tag (${selector})`,
            confidence: this.CONFIDENCE.HIGH
          });
        }
      });

      return results;
    },

    // Method 4: Microdata in HTML
    extractMicrodata() {
      const results = [];
      const dateElements = document.querySelectorAll('[itemprop="datePublished"], [itemprop="dateModified"], [itemprop="dateCreated"]');

      dateElements.forEach(element => {
        const itemprop = element.getAttribute('itemprop');
        const date = element.getAttribute('datetime') || element.getAttribute('content') || element.textContent.trim();
        
        if (date) {
          let type = 'Published';
          if (itemprop === 'dateModified') type = 'Modified';
          if (itemprop === 'dateCreated') type = 'Created';

          results.push({
            date: date,
            type: type,
            source: 'Microdata (itemprop)',
            confidence: this.CONFIDENCE.HIGH
          });
        }
      });

      return results;
    },

    // Method 5: Time elements
    extractTimeElements() {
      const results = [];
      const timeElements = document.querySelectorAll('time[datetime]');

      timeElements.forEach(element => {
        const datetime = element.getAttribute('datetime');
        const classList = element.className.toLowerCase();
        const parentText = element.parentElement?.textContent.toLowerCase() || '';

        let type = 'Published';
        let confidence = this.CONFIDENCE.MEDIUM;

        // Try to determine what type of date this is
        if (classList.includes('updated') || classList.includes('modified') || 
            parentText.includes('updated') || parentText.includes('modified')) {
          type = 'Modified';
        } else if (classList.includes('published') || classList.includes('posted') ||
                   parentText.includes('published') || parentText.includes('posted')) {
          type = 'Published';
          confidence = this.CONFIDENCE.HIGH;
        }

        results.push({
          date: datetime,
          type: type,
          source: 'HTML time element',
          confidence: confidence
        });
      });

      return results;
    },

    // Method 6: URL pattern analysis
    extractFromUrl() {
      const results = [];
      const url = window.location.href;
      
      // Pattern: /YYYY/MM/DD/ or /YYYY/MM/ or /YYYY-MM-DD/
      const urlDatePatterns = [
        /\/(\d{4})\/(\d{2})\/(\d{2})\//,
        /\/(\d{4})\/(\d{2})\//,
        /\/(\d{4})-(\d{2})-(\d{2})\//,
        /\/(\d{4})-(\d{2})\//
      ];

      for (const pattern of urlDatePatterns) {
        const match = url.match(pattern);
        if (match) {
          const year = match[1];
          const month = match[2];
          const day = match[3] || '01';
          
          results.push({
            date: `${year}-${month}-${day}`,
            type: 'Published',
            source: 'URL pattern',
            confidence: this.CONFIDENCE.MEDIUM
          });
          break;
        }
      }

      return results;
    },

    // Method 7: Heuristic text analysis
    extractFromText() {
      const results = [];
      const bodyText = document.body.textContent;
      
      // Look for common date patterns in text
      const datePatterns = [
        // "Published: January 15, 2024" or "Published on January 15, 2024"
        /(?:published|posted|created|written)(?:\s+on)?[\s:]+([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
        // "Updated: January 15, 2024"
        /(?:updated|modified|edited)(?:\s+on)?[\s:]+([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
        // "15 January 2024"
        /(?:published|posted|created|written)(?:\s+on)?[\s:]+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i,
        // ISO format
        /(?:published|posted|created|written)(?:\s+on)?[\s:]+(\d{4}-\d{2}-\d{2})/i
      ];

      // Only check first 5000 characters to avoid performance issues
      const textToSearch = bodyText.substring(0, 5000);

      for (const pattern of datePatterns) {
        const match = textToSearch.match(pattern);
        if (match) {
          const isUpdate = /updated|modified|edited/i.test(match[0]);
          results.push({
            date: match[1],
            type: isUpdate ? 'Modified' : 'Published',
            source: 'Text content heuristics',
            confidence: this.CONFIDENCE.MEDIUM
          });
          break; // Only take first match to avoid duplicates
        }
      }

      return results;
    },

    // Parse and normalize dates
    normalizeDate(dateStr) {
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          return null;
        }
        return date.toISOString();
      } catch (e) {
        return null;
      }
    },

    // Remove duplicates and sort by confidence
    deduplicateDates(dates) {
      const seen = new Map();
      
      dates.forEach(item => {
        const normalized = this.normalizeDate(item.date);
        if (!normalized) return;

        const key = `${item.type}-${normalized}`;
        
        if (!seen.has(key) || this.getConfidenceScore(item.confidence) > this.getConfidenceScore(seen.get(key).confidence)) {
          seen.set(key, { ...item, date: normalized });
        }
      });

      return Array.from(seen.values()).sort((a, b) => {
        // Sort by confidence, then by type (Published > Modified > Created)
        const confDiff = this.getConfidenceScore(b.confidence) - this.getConfidenceScore(a.confidence);
        if (confDiff !== 0) return confDiff;
        
        const typeOrder = { 'Published': 0, 'Modified': 1, 'Created': 2 };
        return (typeOrder[a.type] || 3) - (typeOrder[b.type] || 3);
      });
    },

    getConfidenceScore(confidence) {
      const scores = { high: 3, medium: 2, low: 1 };
      return scores[confidence] || 0;
    },

    // Main extraction function
    extractAllDates() {
      const allDates = [
        ...this.extractOpenGraphDates(),
        ...this.extractJsonLdDates(),
        ...this.extractMetaTags(),
        ...this.extractMicrodata(),
        ...this.extractTimeElements(),
        ...this.extractFromUrl(),
        ...this.extractFromText()
      ];

      return this.deduplicateDates(allDates);
    }
  };

  // Listen for messages from popup
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDates') {
      const dates = DateDetective.extractAllDates();
      sendResponse({ dates: dates, url: window.location.href });
    }
    return true;
  });
})();
