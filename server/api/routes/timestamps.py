from fastapi import APIRouter
from pydantic import BaseModel
from core.gemini import gemini_model
from api.controllers import timestamp_controller
from fastapi import HTTPException

class URL(BaseModel):
    url: str

router = APIRouter()

@router.post('/')
async def generate_timestamps(payload: URL):
    try:
        json_data = timestamp_controller.handle_get_timestamps(payload.url)
        return {"json data": json_data}
    except RuntimeError as e:
        print("Transcript error:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
