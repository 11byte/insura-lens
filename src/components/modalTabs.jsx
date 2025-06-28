import React, { useState } from "react";
import PreferencesForm from "./PreferencesForm";

export default function ModalTabs({ onClose }) {
  const [tab, setTab] = useState("history");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>❌ Close</button>
        <div className="tabs">
          <button onClick={() => setTab("history")}>History</button>
          <button onClick={() => setTab("settings")}>Settings</button>
          <button onClick={() => setTab("prefs")}>Preferences</button>
        </div>

        {tab === "history" && (
          <div>History of visited sites will appear here.</div>
        )}
        {tab === "settings" && (
          <div>
            <p>Select LLM Complexity:</p>
            <select>
              <option>Simple</option>
              <option>Moderate</option>
              <option>Detailed</option>
            </select>
          </div>
        )}
        {tab === "prefs" && <PreferencesForm />}
      </div>
    </div>
  );
}
