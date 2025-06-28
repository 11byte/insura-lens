import os
from mistralai import Mistral
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env or .env.local

api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"

client = Mistral(api_key=api_key)

def get_llm_response(user_input: str) -> str:
    try:
        # Prepend system message for structured responses
        chat_response = client.chat.complete(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a knowledgeable and helpful insurance advisor. "
                        "Always provide structured, easy-to-understand, and trustworthy responses. "
                        "If multiple insurance options are present, compare them with pros and cons. "
                        "Use headings, bullet points, or tables where helpful."
                        "provide the response in a structured manner that can be easily displayed in terms of individual paras , leave space after one para."
                        "suggest the best insurance plan at the start itself if request consists of multiple insurances"
                    )
                },
                {
                    "role": "user",
                    "content": user_input,
                },
            ],
        )
        return chat_response.choices[0].message.content

    except Exception as e:
        print(f"🔥 Error calling Mistral API: {e}")
        return "⚠️ Sorry, something went wrong while processing your query."
