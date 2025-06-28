// Prevent multiple injections
if (!document.getElementById("insuralens-shadow-host")) {
  const shadowHost = document.createElement("div");
  shadowHost.id = "insuralens-shadow-host";
  document.body.appendChild(shadowHost);

  // Attach Shadow DOM
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // App container inside Shadow DOM
  const root = document.createElement("div");
  root.id = "insuralens-root";
  shadowRoot.appendChild(root);

  // Inject build assets (CSS + JS)
  fetch(chrome.runtime.getURL("asset-manifest.json"))
    .then((res) => res.json())
    .then((manifest) => {
      const mainJS = manifest.files["main.js"];
      const mainCSS = manifest.files["main.css"];

      // Inject styles
      if (mainCSS) {
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = chrome.runtime.getURL(mainCSS);
        shadowRoot.appendChild(style);
      }

      // Inject React script (must go in global scope)
      if (mainJS) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = chrome.runtime.getURL(mainJS);
        document.body.appendChild(script);
      }
    })
    .catch((err) => console.error("Error loading assets:", err));
}

// ----------------------------------
// Extraction + Explanation Handling
// ----------------------------------

let lastExtractedContent = ""; // Global store for extracted insurance content

window.addEventListener("message", async (event) => {
  if (
    event.source !== window ||
    !event.data ||
    event.data.source !== "insuralens-ui"
  )
    return;

  const { type } = event.data;

  // 1. 🔍 Handle Extract Insurance Details
  if (type === "EXTRACT_INSURANCE_DETAILS_REQUEST") {
    try {
      lastExtractedContent = document.body.innerText;

      const res = await fetch("http://localhost:5000/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageContent: lastExtractedContent }),
      });

      const data = await res.json();

      window.postMessage(
        {
          source: "insuralens-content",
          type: "EXTRACTION_COMPLETE",
          data,
        },
        "*"
      );
    } catch (err) {
      console.error("Extraction failed:", err);
    }
  }

  // 2. 🧠 Handle Explain Button Click
  if (type === "EXPLAIN_INSURANCE_DETAILS") {
    if (!lastExtractedContent) {
      window.postMessage({
        source: "insuralens-content",
        type: "EXPLAIN_ERROR",
        error: "No content extracted yet. Please extract first.",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Act as an expert insurance advisor and explain the following webpage content in a clear, structured way:\n\n${lastExtractedContent}`,
        }),
      });

      const data = await res.json();

      window.postMessage(
        {
          source: "insuralens-content",
          type: "EXPLAIN_COMPLETE",
          data,
        },
        "*"
      );
    } catch (err) {
      console.error("Explanation failed:", err);
      window.postMessage({
        source: "insuralens-content",
        type: "EXPLAIN_ERROR",
        error: "Failed to explain content.",
      });
    }
  }
});
