from fastapi import APIRouter
from pydantic import BaseModel
from core.gemini import gemini_model
from api.controllers import timestamp_controller

class URL(BaseModel):
    url: str

router = APIRouter()

@router.post('/')
async def generate_timestamps(payload: URL):
    json_data = timestamp_controller.handle_get_timestamps(payload.url)
    print("Returning json data:", json_data) 
    return {"json data": json_data}
