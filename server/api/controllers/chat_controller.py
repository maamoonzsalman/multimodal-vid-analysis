from utils.youtube import extract_video_id, get_transcript_text, build_chat_prompt, query_gemini

def handle_video_inquiry(video_id: str, inquiry: str):
    transcript = get_transcript_text(video_id)
    prompt = build_chat_prompt(transcript, inquiry)
    json_data = query_gemini(prompt)
    return json_data
