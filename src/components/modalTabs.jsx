import React, { useState } from "react";
import PreferencesForm from "./PreferencesForm";

export default function ModalTabs({ onClose }) {
  const [tab, setTab] = useState("history");

  const tabs = [
    { id: "history", label: "🕘 History" },
    { id: "settings", label: "⚙️ Settings" },
    { id: "prefs", label: "🎯 Preferences" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100001]">
      <div className="bg-[#0e1b2d] text-white rounded-xl w-[500px] max-w-[90vw] shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-400 transition text-lg font-bold"
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-beige mb-4 border-b border-gray-600 pb-2">
          InsuraLens Control Panel
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-around mb-4 border-b border-gray-600">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 transition font-medium rounded-t-md ${
                tab === id
                  ? "text-beige border-b-2 border-beige"
                  : "text-gray-400 hover:text-beige"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-3 text-sm text-gray-200">
          {tab === "history" && (
            <div>
              <h3 className="text-lg text-beige font-semibold mb-2">
                Recently Visited
              </h3>
              <p className="text-sm text-gray-300">
                History of insurance websites you’ve explored will appear here.
              </p>
            </div>
          )}

          {tab === "settings" && (
            <div>
              <h3 className="text-lg text-beige font-semibold mb-2">
                AI Response Complexity
              </h3>
              <select
                className="w-full mt-1 px-4 py-2 bg-[#192840] border border-gray-600 rounded-md text-white focus:outline-none"
                defaultValue="Moderate"
              >
                <option>Simple</option>
                <option>Moderate</option>
                <option>Detailed</option>
              </select>
              <p className="text-xs mt-2 text-gray-400">
                Choose the level of explanation you prefer when the AI
                summarizes insurance content.
              </p>
            </div>
          )}

          {tab === "prefs" && <PreferencesForm />}
        </div>
      </div>
    </div>
  );
}
