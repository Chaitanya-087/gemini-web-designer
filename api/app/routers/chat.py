"""This module contains the routes for the chat API."""
from fastapi import APIRouter

from ..services.chat import get_chats_by_user_id, create_chat_by_user_id,\
                            get_chat_by_id, delete_chat_by_id, \
                            post_message_by_chat_id
from ..services.gemini import get_ai_response

from ..models.chat import Prompt

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
)

@router.get("/users/{user_id}/all", status_code=200)
async def get_all_chats(user_id: str):
    """Get all chats by a specific user."""
    return await get_chats_by_user_id(user_id)

@router.get("/{chat_id}", status_code=200)
async def get_chat(chat_id: str):
    """Get a chat by chat ID."""
    return await get_chat_by_id(chat_id)

@router.post("/users/{user_id}", status_code=201)
async def create_chat(user_id: str):
    """Create a new chat for a specific user."""
    return await create_chat_by_user_id(user_id)

@router.post("/default", status_code=200)
async def default_chat(prompt: Prompt):
    """Get a response from the Gemini model."""
    return await get_ai_response(prompt.input)

@router.post("/{chat_id}/messages", status_code=201)
async def send_message(chat_id: str, prompt: Prompt):
    """Post a message in a chat by chat ID."""
    return await post_message_by_chat_id(prompt, chat_id)

@router.delete("/{chat_id}", status_code=200)
async def delete_chat(chat_id: str):
    """Delete a chat by chat ID."""
    return await delete_chat_by_id(chat_id)
