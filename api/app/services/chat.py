"""This file contains the services for the chat module"""
from fastapi import HTTPException
from bson import ObjectId

from ..config.mongo import chatsCollection

from ..schemas.chat import all_chats,basic_chat,detailed_chat

from ..models.chat import Chat

def get_chats_by_user_id(user_id: str) -> all_chats:
    """Get all chats by user ID."""
    resp =  chatsCollection.find({"userId": user_id})
    if resp is None:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return all_chats(resp)

def create_chat_by_user_id(user_id: str) -> basic_chat:
    """Create a new chat by user ID."""
    chat = Chat(userId=user_id)
    resp = chatsCollection.insert_one(chat.model_dump())
    return basic_chat({"_id": resp.inserted_id, **chat.model_dump()})

def get_chat_by_id(chat_id: str) -> detailed_chat:
    """Get a chat by chat ID."""
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(status_code=400, detail="Invalid chat ID")
    resp = chatsCollection.find_one({"_id": ObjectId(chat_id)})
    if resp is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return detailed_chat(resp)

def delete_chat_by_id(chat_id: str):
    """Delete a chat by chat ID."""
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(status_code=400, detail="Invalid chat ID")
    resp = chatsCollection.delete_one({"_id": ObjectId(chat_id)})
    if resp.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"message": "Chat deleted successfully."}

def post_message_by_chat_id():
    """Post a message in a chat by chat ID."""
