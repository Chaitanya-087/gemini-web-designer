from fastapi import APIRouter, HTTPException
from bson import ObjectId

from ..models import Prompt, Chat
from ..schemas.chat import individualChat, allChats

from ..config.mongo import chatsCollection
from ..services.gemini import runResponse as get_ai_response

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
)

# Create a new chat
@router.post("/users/{userId}", status_code=201)
async def create_chat(userId: str):
    new_chat = Chat(user_id=userId)
    resp = chatsCollection.insert_one(new_chat.model_dump())
    return {"id": str(resp.inserted_id)}

# Get a specific chat by chat ID
@router.get("/{chatId}", status_code=200)
async def get_chat(chatId: str):
    if not ObjectId.is_valid(chatId):
        raise HTTPException(status_code=400, detail="Invalid chat ID")
    resp = chatsCollection.find_one({"_id": ObjectId(chatId)})
    if resp is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return individualChat(resp)

# Get all chats by a specific user
@router.get("/users/{userId}/all", status_code=200)
async def get_all_chats(userId: str):
    resp = chatsCollection.find({"user_id": userId})
    if resp is None:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return allChats(resp)

#Post a message in a chat
@router.post("/{chatId}/messages", status_code=201)
async def send_message(chatId: str, message: Prompt):
    if not ObjectId.is_valid(chatId):
        raise HTTPException(status_code=400, detail="Invalid chat ID")
    
    aiResponse = await get_ai_response(message,chatId)
    
    result = chatsCollection.update_one(
        {"_id": ObjectId(chatId)},
        {
            "$push": {
                "messages": {"user_message": message.model_dump(),"ai_response": aiResponse.model_dump()},
            }
        }
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    return {"message": "Message added successfully"}

#delete a chat by chat ID
@router.delete("/{chatId}")
def deleteChat(chatId: str):
    if not ObjectId.is_valid(chatId):
        raise HTTPException(status_code=400, detail="Invalid chat ID")
    delete_result = chatsCollection.delete_one({"_id": ObjectId(chatId)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"message": "Chat deleted successfully"}

#Delete all chats for a specific user
@router.delete("/users/{userId}/all")
def deleteAllChats(userId: str):
    delete_result = chatsCollection.delete_many({"user_id": userId})
    return {"deleted_count": delete_result.deleted_count}
