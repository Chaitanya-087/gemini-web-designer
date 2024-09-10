from fastapi import APIRouter
from ..schemas.message import Message
from ..services.gemini import runResponse, test

router = APIRouter()

@router.post("/sendPrompt")
async def sendPrompt(prompt: Message):
    return  await runResponse(prompt)