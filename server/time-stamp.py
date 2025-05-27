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
def get_transcript_text(video_id: str) -> str:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except TranscriptsDisabled:
        raise RuntimeError("Transcript is disabled or unavailable for this video.")
    
    # slice transcript
    segments = transcript

    lines = [
        f"{int(seg['start'])//60}:{int(seg['start'])%60:02d} - {seg['text']}"
        for seg in segments
    ]
    return "\n".join(lines)

# build the prompt for Gemini
def build_prompt(transcript_text: str) -> str:
    return (
        "Here's a transcript with timestamps from a YouTube video:\n\n"
        f"{transcript_text}\n\n"
        "Return a JSON object where each key is the timestamp (like '0:42') of a new scene/topic, "
        "and each value is a very short, clean title for that section (1-5 words). Respond only with valid JSON. No explanation."
    )


# Run Gemini API on the transcript
def query_gemini(prompt: str):
    response = gemini_model.generate_content([prompt])
    raw = response.text.strip("```json").strip("```").strip()
    return json.loads(raw)
    

# Master function: handles entire process
def analyze_youtube_video(youtube_url: str):
    print("Extracting video ID...")
    video_id = extract_video_id(youtube_url)
    
    print("Fetching transcript from YouTube...")
    transcript_text = get_transcript_text(video_id)
    
    print("Creating prompt for Gemini...")
    prompt = build_prompt(transcript_text)
    
    print("Querying Gemini...")
    json_data = query_gemini(prompt)

    print("Final Output: ")
    print(json.dumps(json_data, indent=2))
    return json_data


# Test the function with a video URL
if __name__ == "__main__":
    test_url = "https://www.youtube.com/watch?v=5X0H_2HjWgI"  # Change to any YouTube URL
    analyze_youtube_video(test_url)
