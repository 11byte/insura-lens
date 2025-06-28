import React, { useState, useEffect } from "react";

export default function PreferencesForm() {
  const [prefs, setPrefs] = useState({
    age: "",
    income: "",
    goal: "",
    risk: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("userPrefs");
    if (saved) setPrefs(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setPrefs({ ...prefs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("userPrefs", JSON.stringify(prefs));
    alert("Preferences saved!");
  };

  return (
    <div>
      <input
        placeholder="Age"
        name="age"
        value={prefs.age}
        onChange={handleChange}
      />
      <input
        placeholder="Income"
        name="income"
        value={prefs.income}
        onChange={handleChange}
      />
      <input
        placeholder="Goal (e.g. Term, Investment)"
        name="goal"
        value={prefs.goal}
        onChange={handleChange}
      />
      <input
        placeholder="Risk Tolerance (Low/Med/High)"
        name="risk"
        value={prefs.risk}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
