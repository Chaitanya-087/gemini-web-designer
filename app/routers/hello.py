from fastapi import APIRouter
from ..schemas.message import Message

router = APIRouter()

@router.get("/",tags=["greet"])
async def greet():
    message=Message(content="welcome to web designer api...🚀")
    return message