""" This module is used to greet the user """
from fastapi import APIRouter
router = APIRouter()

@router.get("/",tags=["greet"], status_code=200)
async def greet():
    """This function greets the user with a welcome message."""
    return {"message": "welcome to web designer api...🚀"}
