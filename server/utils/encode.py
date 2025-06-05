import faiss
import numpy as np
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch
import glob, os, json
from core.utils.video_utils import get_frame_timestamp

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

def encode_image(image_path: str):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        emb = model.get_image_features(**inputs)
    return emb[0].cpu().numpy()

def encode_text(text: str):
    inputs = processor(text=[text], return_tensors="pt", padding=True)
    with torch.no_grad():
        emb = model.get_text_features(**inputs)
    return emb[0].cpu().numpy()

def build_faiss_index(frame_dir, index_path, timestamp_path):
    index = faiss.IndexFlatL2(512)
    embeddings = []
    timestamps = []

    for i, frame in enumerate(sorted(glob.glob(f"{frame_dir}/*.jpg"))):
        emb = encode_image(frame)
        embeddings.append(emb)
        timestamps.append(get_frame_timestamp(i))

    emb_array = np.vstack(embeddings).astype("float32")
    index.add(emb_array)
    faiss.write_index(index, index_path)

    with open(timestamp_path, "w") as f:
        json.dump(timestamps, f)

def search_index(index_path, query_vector, timestamp_path, top_k=3):
    index = faiss.read_index(index_path)
    D, I = index.search(np.array([query_vector]).astype("float32"), top_k)

    with open(timestamp_path) as f:
        timestamps = json.load(f)

    return [
        {"timestamp": timestamps[i], "score": float(D[0][rank])}
        for rank, i in enumerate(I[0])
    ]
