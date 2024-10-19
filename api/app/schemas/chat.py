"""This file contains the schemas for the chat model."""
from typing import List

def basic_chat(chat: dict):
    """Return a basic chat object with id and name.

    Args:
        chat (dict): The chat object from the database.
    
    Returns:
        dict: The formatted chat object with id and name.
    """
    return {
        "id": str(chat["_id"]),
        "name": chat["name"],
        "created_at": chat["createdAt"],
    }

def detailed_chat(chat: dict):
    """Return a detailed chat object with id, name, and messages.

    Args:
        chat (dict): The chat object from the database.

    Returns:
        dict: The formatted chat object with id, name, and messages.
    """
    return {
        "id": str(chat["_id"]),
        "name": chat["name"],
        "messages": chat["messages"],
        "created_at": chat["createdAt"],
        "code": chat["code"],
    }

def all_chats(chats: List[dict]):
    """Return a list of chats.

    Args:
        chats (List[dict]): A list of chat objects.

    Returns:
        List[dict]: A list of formatted chat objects.
    """
    return [basic_chat(chat) for chat in chats]
