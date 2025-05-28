from fastapi import FastAPI
from api.routes import timestamps

app = FastAPI()

# mount router for timestamps
app.include_router(timestamps.router, prefix='/api/timestamps')

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI"}
