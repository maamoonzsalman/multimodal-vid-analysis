import os
import json
import re
from dotenv import load_dotenv
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# initialize gemini
gemini_model = genai.GenerativeModel("gemini-1.5-pro")

# get video ID
def extract_video_id(url: str) -> str:
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
    if not match:
        raise ValueError('Invalid Youtube URL')
    return match.group(1)


# handles entire process
def analyze_youtube_video(youtube_url: str):
    print("📎 Extracting video ID...")
    extract_video_id(youtube_url)

# testing functionality 
if __name__ == "__main__":
    test_url = "https://www.youtube.com/watch?v=5X0H_2HjWgI"  # Change to any YouTube URL
    analyze_youtube_video(test_url)
