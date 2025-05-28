import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize gemini
gemini_model = genai.GenerativeModel("gemini-1.5-pro")
