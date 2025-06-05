from fastapi import APIRouter
from api.models.search import SearchRequest
from api.controllers import visual_search_controller

router = APIRouter()

@router.post("/")
async def search_visual_content(payload: SearchRequest):
    result = visual_search_controller.handle_visual_search(payload.url, payload.query)
    return {"matches": result}
