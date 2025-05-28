from fastapi import APIRouter
from pydantic import BaseModel
from core.gemini import gemini_model
from api.controllers import chat_controller

class Inquiry(BaseModel):
    inquiry: str

router = APIRouter()

@router.post('/{video_id}')
async def answer_video_questions(video_id: str, payload: Inquiry):
    json_data = chat_controller.handle_video_inquiry(video_id, payload.inquiry)
    print("Returning json data:", json_data) 
    return {"json data": json_data}
