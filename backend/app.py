from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.llm_handler import get_llm_response
import logging
import os

app = Flask(__name__)
CORS(app)  # Allow all origins for development

# Logging setup
if not os.path.exists("logs"):
    os.makedirs("logs")
logging.basicConfig(filename="logs/chat.log", level=logging.INFO)

@app.route("/")
def index():
    return jsonify({"message": "InsuraLens backend is running."})

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_input = data.get("message")

        if not user_input:
            return jsonify({"error": "No input received"}), 400

        # Send to LLM
        reply = get_llm_response(user_input)

        # Logging
        logging.info(f"User: {user_input}")
        logging.info(f"AI: {reply}")

        return jsonify({"reply": reply})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/extract", methods=["POST"])
def extract_insurance_details():
    try:
        data = request.json
        page_text = data.get("pageContent")
        preferences = data.get("preferences", {})

        prompt = f"""
You are an AI insurance advisor.

Here is the full page content from a financial website:

---
{page_text}
---

1. Extract all insurance plans from the above content.
2. For each plan, list:
   - Plan Name
   - Type (e.g., health, term life, etc.)
   - Coverage / Benefits
   - Premiums or Cost
3. Then, based on user preferences: {preferences}
   - Recommend the best matching plan
   - Explain why it's the best option
   - Also structure the explanation nicely
"""

        reply = get_llm_response(prompt)

        return jsonify({ "plans": reply })

    except Exception as e:
        return jsonify({ "error": str(e) }), 500


if __name__ == "__main__":
    app.run(debug=True)
