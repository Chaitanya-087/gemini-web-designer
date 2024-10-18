"""This file contains the services for the chat module"""
from fastapi import HTTPException
from ..config.mongo import chatsCollection
from ..schemas.chat import all_chats

def get_chats_by_user_id(user_id: str) -> all_chats:
    """Get all chats by user ID."""
    resp =  chatsCollection.find({"user_id": user_id})
    if resp is None:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return all_chats(resp)

def createChatByUserId():
    pass

def postMessageByChatId():
    pass
