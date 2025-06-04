from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import timestamps, chat
import os

app = FastAPI()

origins = [
    os.getenv("FRONTEND_ORIGIN"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

# mount router for timestamps
app.include_router(timestamps.router, prefix='/api/timestamps')

# mount router for chat box
app.include_router(chat.router, prefix='/api/chat')

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI"}
