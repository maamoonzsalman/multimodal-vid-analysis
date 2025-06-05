import os
import subprocess
import json

def download_video(url: str, out_path: str):
    subprocess.run(["yt-dlp", "-f", "mp4", "-o", out_path, url], check=True)

def extract_frames(video_path: str, output_dir: str, fps: int = 1):
    os.makedirs(output_dir, exist_ok=True)
    subprocess.run([
        "ffmpeg", "-i", video_path,
        "-vf", f"fps={fps}",
        f"{output_dir}/frame_%04d.jpg"
    ], check=True)

def get_frame_timestamp(frame_index: int, fps: int = 1):
    seconds = frame_index // fps
    return f"{seconds//60}:{seconds%60:02d}"
