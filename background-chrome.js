// Date Detective - Background Service Worker (Chrome)
// Handles Wayback Machine API requests

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkWaybackMachine') {
    checkWaybackMachine(request.url)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Will respond asynchronously
  }
});

async function checkWaybackMachine(url) {
  try {
    // Use Wayback Machine availability API
    const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.archived_snapshots && data.archived_snapshots.closest) {
      const snapshot = data.archived_snapshots.closest;
      return {
        available: true,
        timestamp: snapshot.timestamp,
        url: snapshot.url,
        date: parseWaybackTimestamp(snapshot.timestamp)
      };
    }

    return { available: false };
  } catch (error) {
    console.error('Wayback Machine API error:', error);
    return { error: error.message, available: false };
  }
}

function parseWaybackTimestamp(timestamp) {
  // Wayback timestamps are in format: YYYYMMDDhhmmss
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(4, 6);
  const day = timestamp.substring(6, 8);
  const hour = timestamp.substring(8, 10);
  const minute = timestamp.substring(10, 12);
  const second = timestamp.substring(12, 14);

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`).toISOString();
}
