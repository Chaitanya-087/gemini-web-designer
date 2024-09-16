from fastapi import APIRouter
from ..models import Prompt
router = APIRouter()

@router.get("/",tags=["greet"])
async def greet():
    message=Prompt(text="welcome to web designer api...🚀")
    return message