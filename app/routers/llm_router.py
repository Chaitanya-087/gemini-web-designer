from fastapi import APIRouter
from ..schemas.message import Message
from ..services.gemini import runResponse

router = APIRouter()

@router.post("/sendPrompt/")
async def sendPrompt(prompt: Message):
    return runResponse(prompt)