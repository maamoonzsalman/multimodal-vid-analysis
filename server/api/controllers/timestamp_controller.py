from utils.youtube import extract_video_id, get_transcript_text, build_prompt, query_gemini

def handle_get_timestamps(url: str):
    video_id = extract_video_id(url)
    transcript = get_transcript_text(video_id)
    prompt = build_prompt(transcript)
    json_data = query_gemini(prompt)
    return json_data
