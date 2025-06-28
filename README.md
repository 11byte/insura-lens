````markdown
<h1><strong>Insura-Lens</strong></h1> 

## An Agentic AI Extension Tool for Precise Insurance Planning and Recommendation

**Insura-Lens** is a browser extension powered by agentic AI that intelligently scrapes and analyzes insurance content from any webpage in real-time.  
It provides personalized explanations and plan comparisons based on user preferences using cutting-edge large language models (LLMs).

---

## 🚀 Features

- 🔎 Scrapes insurance-related information from any webpage
- 🧠 Uses LLMs to analyze, summarize, and recommend plans
- 🧾 Provides structured, understandable insights to users
- 🧩 Seamless browser extension UI
- ⚙️ User preferences and settings supported

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/11byte/insura-lens.git
cd insura-lens
````

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Set Up Backend Environment

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate   # On Windows
# source myenv/bin/activate   # On Mac/Linux

pip install -r requirements.txt
```

> 🛠️ Make sure to add your Mistral API key:

```bash
export MISTRAL_API_KEY=your_api_key_here   # Or store it in a .env file
```

---

## 🧪 Running the Project

### ➤ Frontend (React Extension Build)

```bash
npm run build
```

This generates the `build/` folder needed for loading the extension into Chrome.

### ➤ Backend (Flask Server)

```bash
cd backend
python app.py
```

---

## 🧩 Load the Extension in Chrome

1. Open `chrome://extensions/` in your Chrome browser.
2. Enable **Developer mode** (toggle at top-right).
3. Click **Load Unpacked**.
4. Select the `/build` folder inside your `insura-lens` project.
5. The Insura-Lens icon will appear; open any insurance-related page to use it.

---

## 🧠 Tech Stack

* **Frontend**: React, Tailwind CSS, Framer Motion
* **Backend**: Flask (Python)
* **LLM**: Mistral AI (`mistral-large-latest`)
* **Browser**: Chrome Extension (Manifest v3)
* **Utilities**: Shadow DOM, PostMessage API, Fetch API

---

## 🎯 Objectives

* To create an agentic AI browser extension for insurance domain.
* To extract and analyze insurance content dynamically.
* To provide real-time LLM-based explanations and suggestions.
* To personalize recommendations based on user input.
* To structure information for better understanding and actionability.

---

## 📌 Scope

* Works on most insurance websites (via content script scraping).
* Integrates LLM-based backend for intelligent responses.
* Modular UI with chatbot, PDF export, and settings panel.
* Adaptable for other financial domains in the future.

---

## ✅ Conclusion

Insura-Lens redefines how users interact with complex insurance webpages.
By combining real-time scraping with powerful language models, it delivers clear, actionable, and personalized advice — all within your browser.

---
