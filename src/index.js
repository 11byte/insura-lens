import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional, but should be included if you're using styles

const shadowHost = document.getElementById("insuralens-shadow-host");
let rootElement = null;

if (shadowHost && shadowHost.shadowRoot) {
  rootElement = shadowHost.shadowRoot.getElementById("insuralens-root");
} else {
  rootElement = document.getElementById("root");
}

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
