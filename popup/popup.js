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
      dateListEl.innerHTML = dates.map(createDateElement).join('');
      waybackSectionEl.classList.remove('hidden');
    }
  }

  function createDateElement(dateInfo) {
    const date = new Date(dateInfo.date);
    const formattedDate = formatDate(date);
    const relativeTime = getRelativeTime(date);

    return `
      <div class="date-item confidence-${dateInfo.confidence}">
        <div class="date-header">
          <span class="date-type">${dateInfo.type}</span>
          <span class="confidence-badge ${dateInfo.confidence}">${dateInfo.confidence}</span>
        </div>
        <div class="date-value">${formattedDate}</div>
        <div class="date-source">${relativeTime} • ${dateInfo.source}</div>
      </div>
    `;
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

    waybackResultEl.innerHTML = `
      <div class="date-header">
        <span class="date-type">First Archive</span>
        <span class="confidence-badge low">estimated</span>
      </div>
      <div class="wayback-date">${formattedDate}</div>
      <div class="wayback-info">${relativeTime} • Wayback Machine snapshot</div>
      <a href="${data.url}" target="_blank" class="wayback-link">View archived version →</a>
    `;
    waybackResultEl.classList.remove('hidden');
  }

  function displayWaybackError(message) {
    waybackResultEl.innerHTML = `<div class="wayback-error">${message}</div>`;
    waybackResultEl.classList.remove('hidden');
  }

  function showError(message) {
    loadingEl.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    noResultsEl.innerHTML = `<p>⚠️ ${message}</p>`;
    noResultsEl.classList.remove('hidden');
  }
});
