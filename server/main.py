from fastapi import FastAPI
from api.routes import timestamps, chat

app = FastAPI()

# mount router for timestamps
app.include_router(timestamps.router, prefix='/api/timestamps')

# mount router for chat box
app.include_router(chat.router, prefix='/api/chat')

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI"}
