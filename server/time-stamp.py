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


# Get transcript with timestamps from YouTube
def get_transcript_text(video_id: str, max_segments: int = 30) -> str:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except TranscriptsDisabled:
        raise RuntimeError("Transcript is disabled or unavailable for this video.")
    
    # slice transcript
    segments = transcript[:max_segments]

    lines = [
        f"{int(seg['start'])//60}:{int(seg['start'])%60:02d} - {seg['text']}"
        for seg in segments
    ]
    return "\n".join(lines)

# Master function: handles entire process
def analyze_youtube_video(youtube_url: str):
    print("📎 Extracting video ID...")
    video_id = extract_video_id(youtube_url)
    
    print("📋 Fetching transcript from YouTube...")
    transcript_text = get_transcript_text(video_id)

# Test the function with a video URL
if __name__ == "__main__":
    test_url = "https://www.youtube.com/watch?v=5X0H_2HjWgI"  # Change to any YouTube URL
    analyze_youtube_video(test_url)
