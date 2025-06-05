import os
from core.utils.video_utils import (
    download_video, extract_frames, get_frame_timestamp
)
from core.utils.encode import (
    encode_image, encode_text, build_faiss_index, search_index
)

def handle_visual_search(url: str, query: str):
    video_id = url.split("v=")[-1]
    video_path = f"data/videos/{video_id}.mp4"
    frame_dir = f"data/frames/{video_id}"
    index_path = f"data/indexes/{video_id}.index"
    timestamp_path = f"data/timestamps/{video_id}.json"

    os.makedirs("data/videos", exist_ok=True)
    os.makedirs("data/frames", exist_ok=True)
    os.makedirs("data/indexes", exist_ok=True)
    os.makedirs("data/timestamps", exist_ok=True)

    if not os.path.exists(video_path):
        download_video(url, video_path)

    if not os.path.exists(frame_dir):
        extract_frames(video_path, frame_dir)

    if not os.path.exists(index_path):
        build_faiss_index(frame_dir, index_path, timestamp_path)

    query_vector = encode_text(query)
    return search_index(index_path, query_vector, timestamp_path)
