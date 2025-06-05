import re
import json
import time
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, CouldNotRetrieveTranscript
from core.gemini import gemini_model


def extract_video_id(url: str) -> str:
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
    if not match:
        raise ValueError("Invalid YouTube URL")
    video_id = match.group(1)
    return video_id

# Get transcript with timestamps from YouTube
def get_transcript_text(video_id: str, retries: int = 6, delay: float = 2.0) -> str:
    last_exception = None

    for attempt in range(retries):
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            if not transcript:
                raise RuntimeError("Transcript was empty.")
            
            lines = [
                f"{int(seg['start'])//60}:{int(seg['start'])%60:02d} - {seg['text']}"
                for seg in transcript
            ]
            return "\n".join(lines)

        except (TranscriptsDisabled, CouldNotRetrieveTranscript) as e:
            raise RuntimeError(f"Transcript error: {str(e)}")
        except Exception as e:
            last_exception = e
            print(f"Retry {attempt+1}/{retries} failed. Retrying in {delay} sec...")
            time.sleep(delay)

    raise RuntimeError(f"Transcript fetch failed after {retries} retries: {str(last_exception)}")

# build the prompt for Gemini
def build_timestamp_prompt(transcript_text: str) -> str:
    return (
        "Here's a transcript with timestamps from a YouTube video:\n\n"
        f"{transcript_text}\n\n"
        "Return a JSON object where each key is the timestamp (like '0:42') of a new scene/topic, "
        "and each value is a very short, clean title for that section (1-5 words). Respond only with valid JSON. No explanation."
    )

def build_chat_prompt(transcript_text: str, inquiry: str) -> str:
    return (
        "You are an assistant that answers questions about YouTube videos based on transcripts with timestamps.\n\n"
        "Here is the transcript:\n\n"
        f"{transcript_text}\n\n"
        "Here is the user's question:\n\n"
        f"{inquiry}\n\n"
        "Please return your response in **valid JSON format** as shown below:\n"
        "{\n"
        "  \"response\": \"<your answer here with [timestamp] citations at relevant points>\"\n"
        "}\n"
        "Be concise. Use only timestamps present in the transcript, and insert them at relevant points inside square brackets. If the answer is not in the video, then convey that."
    )


# Run Gemini API on the transcript
def query_gemini(prompt: str):
    response = gemini_model.generate_content([prompt])
    raw = response.text.strip("```json").strip("```").strip()
    return json.loads(raw)

