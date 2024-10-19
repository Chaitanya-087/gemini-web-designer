"""This module contains the routes for the chat API."""
from fastapi import APIRouter

from ..services.chat import get_chats_by_user_id, create_chat_by_user_id,\
                            get_chat_by_id, delete_chat_by_id
from ..services.gemini import get_ai_response

from ..models.chat import Prompt

from ..schemas.chat import all_chats

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
)

@router.get("/users/{user_id}/all", status_code=200, response_model=all_chats)
async def get_all_chats(user_id: str):
    """Get all chats by a specific user."""
    return get_chats_by_user_id(user_id)

@router.get("/{chat_id}", status_code=200)
async def get_chat(chat_id: str):
    """Get a chat by chat ID."""
    return get_chat_by_id(chat_id)

@router.post("/users/{user_id}", status_code=201)
async def create_chat(user_id: str):
    """Create a new chat for a specific user."""
    return create_chat_by_user_id(user_id)

@router.post("/default", status_code=200)
async def default_chat(prompt: Prompt):
    """Get a response from the Gemini model."""
    response = await get_ai_response(prompt.input)
    return response

# #Post a message in a chat
# @router.post("/{chatId}/messages", status_code=201)
# async def send_message(chatId: str, message: Prompt):
#     if not ObjectId.is_valid(chatId):
#         raise HTTPException(status_code=400, detail="Invalid chat ID")
#     aiResponse = await get_ai_response(message,chatId)
#     message = {"id": messageId,"user_message": message.model_dump(),
#                               "ai_response": aiResponse.model_dump()}
#     result = chatsCollection.update_one(
#         {"_id": ObjectId(chatId)},
#         {
#             "$push": {
#                 "messages": message
#             }
#         }
#     )
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Chat not found")
#     return message

@router.delete("/{chat_id}", status_code=200)
async def delete_chat(chat_id: str):
    """Delete a chat by chat ID."""
    return delete_chat_by_id(chat_id)
