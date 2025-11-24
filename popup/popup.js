// Date Detective - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const resultsEl = document.getElementById('results');
  const dateListEl = document.getElementById('dateList');
  const noResultsEl = document.getElementById('noResults');
  const waybackSectionEl = document.getElementById('waybackSection');
  const waybackResultEl = document.getElementById('waybackResult');
  const checkWaybackBtn = document.getElementById('checkWayback');

  let currentUrl = '';

  // Get dates from content script
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const response = await browser.tabs.sendMessage(tabs[0].id, { action: 'getDates' });
    
    currentUrl = response.url;
    displayResults(response.dates);
  } catch (error) {
    console.error('Error getting dates:', error);
    showError('Unable to analyze this page. Try refreshing the page.');
  }

  function displayResults(dates) {
    loadingEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');

    if (dates.length === 0) {
      noResultsEl.classList.remove('hidden');
      waybackSectionEl.classList.remove('hidden');
    } else {
      // Clear existing content
      dateListEl.textContent = '';
      // Safely append each date element
      dates.forEach(dateInfo => {
        dateListEl.appendChild(createDateElement(dateInfo));
      });
      waybackSectionEl.classList.remove('hidden');
    }
  }

  function createDateElement(dateInfo) {
    const date = new Date(dateInfo.date);
    const formattedDate = formatDate(date);
    const relativeTime = getRelativeTime(date);

    const dateItem = document.createElement('div');
    dateItem.className = `date-item confidence-${dateInfo.confidence}`;

    const dateHeader = document.createElement('div');
    dateHeader.className = 'date-header';

    const dateType = document.createElement('span');
    dateType.className = 'date-type';
    dateType.textContent = dateInfo.type;

    const confidenceBadge = document.createElement('span');
    confidenceBadge.className = `confidence-badge ${dateInfo.confidence}`;
    confidenceBadge.textContent = dateInfo.confidence;

    dateHeader.appendChild(dateType);
    dateHeader.appendChild(confidenceBadge);

    const dateValue = document.createElement('div');
    dateValue.className = 'date-value';
    dateValue.textContent = formattedDate;

    const dateSource = document.createElement('div');
    dateSource.className = 'date-source';
    dateSource.textContent = `${relativeTime} • ${dateInfo.source}`;

    dateItem.appendChild(dateHeader);
    dateItem.appendChild(dateValue);
    dateItem.appendChild(dateSource);

    return dateItem;
  }

  function formatDate(date) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleString('en-US', options);
  }

  function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return `${diffYears} years ago`;
  }

  // Wayback Machine check
  checkWaybackBtn.addEventListener('click', async () => {
    checkWaybackBtn.disabled = true;
    checkWaybackBtn.textContent = 'Checking...';
    waybackResultEl.classList.add('hidden');

    try {
      const response = await browser.runtime.sendMessage({
        action: 'checkWaybackMachine',
        url: currentUrl
      });

      if (response.available) {
        displayWaybackResult(response);
      } else if (response.error) {
        displayWaybackError(`Error: ${response.error}`);
      } else {
        displayWaybackError('No archived snapshots found for this URL');
      }
    } catch (error) {
      displayWaybackError('Failed to check Wayback Machine');
    } finally {
      checkWaybackBtn.disabled = false;
      checkWaybackBtn.textContent = 'Check Archive';
    }
  });

  function displayWaybackResult(data) {
    const date = new Date(data.date);
    const formattedDate = formatDate(date);
    const relativeTime = getRelativeTime(date);

    waybackResultEl.textContent = '';

    const dateHeader = document.createElement('div');
    dateHeader.className = 'date-header';

    const dateType = document.createElement('span');
    dateType.className = 'date-type';
    dateType.textContent = 'First Archive';

    const confidenceBadge = document.createElement('span');
    confidenceBadge.className = 'confidence-badge low';
    confidenceBadge.textContent = 'estimated';

    dateHeader.appendChild(dateType);
    dateHeader.appendChild(confidenceBadge);

    const waybackDate = document.createElement('div');
    waybackDate.className = 'wayback-date';
    waybackDate.textContent = formattedDate;

    const waybackInfo = document.createElement('div');
    waybackInfo.className = 'wayback-info';
    waybackInfo.textContent = `${relativeTime} • Wayback Machine snapshot`;

    const waybackLink = document.createElement('a');
    waybackLink.href = data.url;
    waybackLink.target = '_blank';
    waybackLink.className = 'wayback-link';
    waybackLink.textContent = 'View archived version →';

    waybackResultEl.appendChild(dateHeader);
    waybackResultEl.appendChild(waybackDate);
    waybackResultEl.appendChild(waybackInfo);
    waybackResultEl.appendChild(waybackLink);
    waybackResultEl.classList.remove('hidden');
  }

  function displayWaybackError(message) {
    waybackResultEl.textContent = '';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'wayback-error';
    errorDiv.textContent = message;
    waybackResultEl.appendChild(errorDiv);
    waybackResultEl.classList.remove('hidden');
  }

  function showError(message) {
    loadingEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    noResultsEl.textContent = '';
    const errorP = document.createElement('p');
    errorP.textContent = `⚠️ ${message}`;
    noResultsEl.appendChild(errorP);
    noResultsEl.classList.remove('hidden');
  }
});
