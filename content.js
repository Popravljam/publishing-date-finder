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
        // Skip if element is in sidebar or recommended areas
        if (this.isInExcludedArea(element)) {
          return;
        }

        const itemprop = element.getAttribute('itemprop');
        const date = element.getAttribute('datetime') || element.getAttribute('content') || element.textContent.trim();
        
        if (date) {
          let type = 'Published';
          if (itemprop === 'dateModified') type = 'Modified';
          if (itemprop === 'dateCreated') type = 'Created';

          // Microdata is always high confidence (structured data)
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
      let firstMainArticleDate = null;

      timeElements.forEach(element => {
        // Skip if element is in sidebar, recommended, or navigation areas
        if (this.isInExcludedArea(element)) {
          return;
        }

        const datetime = element.getAttribute('datetime');
        const classList = element.className.toLowerCase();
        const parentText = element.parentElement?.textContent.toLowerCase() || '';
        const isInMainArticle = this.isInMainArticle(element);
        const pagePosition = this.getPagePosition(element);

        let type = 'Published';
        let confidence = this.CONFIDENCE.MEDIUM;

        // Adjust confidence based on page position
        if (pagePosition > 0.8) {
          // Bottom 20% of page - lower confidence (likely footer suggestions)
          confidence = this.CONFIDENCE.LOW;
        } else if (pagePosition < 0.2 && !isInMainArticle) {
          // Top 20% but not in main article - could be header date
          confidence = this.CONFIDENCE.MEDIUM;
        }

        // Try to determine what type of date this is
        if (classList.includes('updated') || classList.includes('modified') || 
            parentText.includes('updated') || parentText.includes('modified')) {
          type = 'Modified';
        } else if (classList.includes('published') || classList.includes('posted') ||
                   parentText.includes('published') || parentText.includes('posted')) {
          type = 'Published';
          confidence = this.CONFIDENCE.HIGH; // High for explicitly marked dates
        } else if (isInMainArticle && firstMainArticleDate === null) {
          // Only give high confidence to the FIRST date in main article
          confidence = this.CONFIDENCE.HIGH;
          firstMainArticleDate = datetime; // Mark that we found the first one
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

    // Helper: Check if element is in sidebar, recommended, or other excluded areas
    isInExcludedArea(element) {
      // First check if element is inside main article container
      if (this.isInMainArticle(element)) {
        return false; // If it's in main article, don't exclude it
      }
      
      // Check the element and its parents for common sidebar/recommendation indicators
      let current = element;
      let depth = 0;
      const maxDepth = 15; // Increased to traverse further up

      while (current && current !== document.body && depth < maxDepth) {
        const className = current.className ? current.className.toLowerCase() : '';
        const id = current.id ? current.id.toLowerCase() : '';
        const role = current.getAttribute('role') || '';
        const dataTestId = (current.getAttribute('data-testid') || '').toLowerCase();
        const dataComponent = (current.getAttribute('data-component') || '').toLowerCase();
        
        // Check if this container has multiple time/date elements (likely an article list)
        if (depth > 0 && depth < 5) {
          const timeElements = current.querySelectorAll('time[datetime], [itemprop*="date"]');
          if (timeElements.length > 3) {
            // This container has multiple dates, likely a list of articles
            return true;
          }
        }
        
        // Check data attributes (used by BBC and other sites)
        if (dataTestId.includes('promo') || dataTestId.includes('card') || 
            dataTestId.includes('list') || dataTestId.includes('related')) {
          return true;
        }
        
        if (dataComponent.includes('promo') || dataComponent.includes('card') ||
            dataComponent.includes('related') || dataComponent.includes('recommendations')) {
          return true;
        }
        
        // Common patterns for excluded areas
        const excludedPatterns = [
          // Sidebar variations
          'sidebar', 'side-bar', 'side_bar', 'rail', 'side-rail',
          // Recommended/Related content
          'recommended', 'related', 'suggestion', 'suggest',
          'you-may-like', 'you-might-like', 'read-more', 'read-next',
          'more-from', 'also-read', 'continue-reading',
          // Navigation
          'navigation', 'nav', 'menu', 'navbar', 'nav-bar',
          // Header/Footer
          'footer', 'header', 'site-header', 'site-footer',
          // Widgets
          'widget', 'aside',
          // Trending/Popular
          'trending', 'popular', 'latest', 'recent',
          'most-read', 'most-viewed', 'top-stories',
          // More stories/articles
          'more-stories', 'other-articles', 'more-articles',
          'story-list', 'article-list', 'post-list',
          // Comments
          'comment', 'discussion', 'disqus',
          // Promo/Ad areas
          'promo', 'promotion', 'ad', 'advertisement',
          // Social
          'social', 'share', 'follow',
          // Secondary content
          'secondary', 'complementary', 'auxiliary',
          // Lists and grids of other content
          'grid', 'list', 'carousel', 'slider',
          'tile', 'card-list', 'feed',
          // BBC-specific
          'promo', 'bbc-', 'top-story', 'story-promo',
          'media-list', 'link-list',
          // General article lists
          'article-promo', 'post-promo', 'story-card',
          'content-list', 'news-list', 'item-list',
          // "More" sections
          'more', 'extra', 'additional', 'see-also',
          // Bottom sections
          'bottom', 'footer-content', 'page-footer',
          'weiter', 'mehr', 'weitere', // German: more, further
          'lesetipp', 'empfehlung', 'vorschlag', // German: reading tip, recommendation, suggestion
          // Teaser sections
          'teaser', 'preview', 'excerpt',
          'article-teaser', 'story-teaser'
        ];

        // Check if any excluded pattern matches
        const hasExcludedPattern = excludedPatterns.some(pattern => 
          className.includes(pattern) || id.includes(pattern)
        );

        if (hasExcludedPattern) {
          return true;
        }

        // Check for <aside> or complementary role
        if (current.tagName === 'ASIDE' || role === 'complementary' || role === 'navigation') {
          return true;
        }

        current = current.parentElement;
        depth++;
      }

      return false;
    },

    // Helper: Check if element is in main article content area
    isInMainArticle(element) {
      let current = element;
      let depth = 0;
      const maxDepth = 15;

      while (current && current !== document.body && depth < maxDepth) {
        const tagName = current.tagName;
        const role = current.getAttribute('role') || '';
        const className = current.className ? current.className.toLowerCase() : '';
        const id = current.id ? current.id.toLowerCase() : '';
        const itemType = current.getAttribute('itemtype') || '';

        // Check for semantic article tags
        if (tagName === 'ARTICLE') {
          return true;
        }

        // Check for main content role
        if (role === 'main' || role === 'article') {
          return true;
        }

        // Check for <main> tag
        if (tagName === 'MAIN') {
          return true;
        }

        // Check for schema.org Article type
        if (itemType.includes('Article') || itemType.includes('NewsArticle')) {
          return true;
        }

        // Check for common main article class/id patterns
        const mainPatterns = [
          'article-body', 'article-content', 'article-main',
          'post-content', 'post-body', 'entry-content',
          'main-content', 'content-main', 'primary-content',
          'story-body', 'story-content'
        ];

        const hasMainPattern = mainPatterns.some(pattern =>
          className.includes(pattern) || id.includes(pattern)
        );

        if (hasMainPattern) {
          return true;
        }

        current = current.parentElement;
        depth++;
      }

      return false;
    },

    // Helper: Get element's relative position on page (0-1)
    getPagePosition(element) {
      try {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        return elementTop / documentHeight;
      } catch (e) {
        return 0.5; // Default to middle if error
      }
    },

    // Method 6: URL pattern analysis
    extractFromUrl() {
      const results = [];
      const url = window.location.href;
      
      // Check URL structure patterns
      const urlDatePatterns = [
        // /YYYY/MM/DD/ format
        { pattern: /\/(\d{4})\/(\d{2})\/(\d{2})[\/\?#-]/, hasDay: true },
        // /YYYY/MM/ format
        { pattern: /\/(\d{4})\/(\d{2})[\/\?#-]/, hasDay: false },
        // /YYYY-MM-DD format
        { pattern: /\/(\d{4})-(\d{2})-(\d{2})[\/\?#-]/, hasDay: true },
        // /YYYY-MM format
        { pattern: /\/(\d{4})-(\d{2})[\/\?#-]/, hasDay: false },
        // /YYYYMMDD format (compact)
        { pattern: /\/(\d{4})(\d{2})(\d{2})[\/\?#-]/, hasDay: true },
        // article-YYYY-MM-DD or similar
        { pattern: /[-_](\d{4})[-_](\d{2})[-_](\d{2})/, hasDay: true }
      ];

      for (const { pattern, hasDay } of urlDatePatterns) {
        const match = url.match(pattern);
        if (match) {
          const year = match[1];
          const month = match[2];
          const day = hasDay && match[3] ? match[3] : '01';
          
          // Validate year is reasonable (between 1990 and 2100)
          const yearNum = parseInt(year);
          if (yearNum >= 1990 && yearNum <= 2100) {
            results.push({
              date: `${year}-${month}-${day}`,
              type: 'Published',
              source: 'URL structure',
              confidence: this.CONFIDENCE.MEDIUM
            });
            break;
          }
        }
      }

      return results;
    },

    // Method 7: Heuristic text analysis
    extractFromText() {
      const results = [];
      const bodyText = document.body.textContent;
      
      // Look for common date patterns in text
      // Top 10 languages by speakers: English, Mandarin, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, Japanese
      const publishKeywords = 'published|posted|created|written|' +
        // Spanish
        'publicado|creado|escrito|' +
        // French
        'publié|créé|écrit|' +
        // German
        'veröffentlicht|erstellt|geschrieben|' +
        // Portuguese
        'publicado|criado|escrito|' +
        // Russian (Cyrillic)
        'опубликовано|написано|создано|' +
        // Japanese (Hiragana/Katakana)
        '公開|投稿|' +
        // Hindi (Devanagari)
        'प्रकाशित|लिखा|' +
        // Arabic
        'نشر|كتب|' +
        // Mandarin (Simplified)
        '发布|创建|写|' +
        // Italian
        'pubblicato|scritto';
      
      const updateKeywords = 'updated|modified|edited|' +
        // Spanish
        'actualizado|modificado|editado|' +
        // French
        'modifié|mis à jour|édité|' +
        // German
        'aktualisiert|geändert|bearbeitet|' +
        // Portuguese
        'atualizado|modificado|editado|' +
        // Russian
        'обновлено|изменено|' +
        // Japanese
        '更新|修正|' +
        // Hindi
        'अद्यतन|संशोधित|' +
        // Arabic
        'حدث|عدل|' +
        // Mandarin
        '更新|修改|' +
        // Italian
        'aggiornato|modificato';

      const datePatterns = [
        // With keywords - MEDIUM confidence
        // "Published: January 15, 2024" or "Published on January 15, 2024"
        new RegExp(`(?:${publishKeywords})(?:\\s+on|\\s+am)?[\\s:]+([A-Za-zÀ-ſ\u4e00-\u9fff\u0900-\u097f\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff]+\\s+\\d{1,2},?\\s+\\d{4})`, 'i'),
        // "Updated: January 15, 2024"
        new RegExp(`(?:${updateKeywords})(?:\\s+on|\\s+am)?[\\s:]+([A-Za-zÀ-ſ\u4e00-\u9fff\u0900-\u097f\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff]+\\s+\\d{1,2},?\\s+\\d{4})`, 'i'),
        // "15 January 2024" with keyword
        new RegExp(`(?:${publishKeywords})(?:\\s+on|\\s+am)?[\\s:]+(\\d{1,2}\\s+[A-Za-zÀ-ſ\u4e00-\u9fff\u0900-\u097f\u0600-\u06ff]+\\s+\\d{4})`, 'i'),
        // ISO format with keyword
        new RegExp(`(?:${publishKeywords})(?:\\s+on|\\s+am)?[\\s:]+(\\d{4}-\\d{2}-\\d{2})`, 'i'),
        // DD.MM.YYYY with keyword (European)
        new RegExp(`(?:${publishKeywords})(?:\\s+on|\\s+am)?[\\s:]+(\\d{1,2}\\.\\d{1,2}\\.\\d{4})`, 'i'),
        // MM/DD/YYYY with keyword
        new RegExp(`(?:${publishKeywords})(?:\\s+on|\\s+am)?[\\s:]+(\\d{1,2}\\/\\d{1,2}\\/\\d{4})`, 'i'),
        
        // Standalone formats - LOW confidence
        // "January 15, 2024" or "15 January 2024"
        /\b([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})\b/,
        /\b(\d{1,2}\s+[A-Z][a-z]+\s+\d{4})\b/,
        // ISO format: 2024-01-15
        /\b(\d{4}-\d{2}-\d{2})\b/,
        // European: DD.MM.YYYY
        /\b(\d{1,2}\.\d{1,2}\.\d{4})\b/,
        // US: MM/DD/YYYY
        /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/,
        // DD-MM-YYYY or DD/MM/YYYY
        /\b(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})\b/
      ];

      // Only check first 5000 characters to avoid performance issues
      const textToSearch = bodyText.substring(0, 5000);

      for (let i = 0; i < datePatterns.length; i++) {
        const pattern = datePatterns[i];
        const match = textToSearch.match(pattern);
        if (match) {
          // Check if it's an update keyword (expanded for all languages)
          const isUpdate = new RegExp(updateKeywords, 'i').test(match[0]);
          const hasKeyword = new RegExp(`${publishKeywords}|${updateKeywords}`, 'i').test(match[0]);
          
          // First 6 patterns have keywords = MEDIUM confidence
          // Remaining patterns are standalone = LOW confidence
          let confidence = i < 6 ? this.CONFIDENCE.MEDIUM : this.CONFIDENCE.LOW;
          
          results.push({
            date: match[1],
            type: isUpdate ? 'Modified' : 'Published',
            source: 'Text content heuristics',
            confidence: confidence
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
