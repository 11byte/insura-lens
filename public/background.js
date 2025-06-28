chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "EXTRACT_INSURANCE_DETAILS") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        sendResponse({ error: "No active tab" });
        return;
      }

      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "EXTRACT_TEXT" },
        (response) => {
          if (chrome.runtime.lastError || !response?.textContent) {
            sendResponse({ error: "Content extraction failed" });
          } else {
            sendResponse({ textContent: response.textContent });
          }
        }
      );
    });

    // Important for async sendResponse to work
    return true;
  }
});
