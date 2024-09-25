from ..config.mongo import chatsCollection
from fastapi import HTTPException
from ..schemas.chat import individualChat, allChats
tempChats = []

#Get all chats by user
def getChatsByUserId(userId: str):
    resp =  chatsCollection.find({"user_id": userId})
    if resp is None:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return resp

#Create a new chat by userId
def createChatByUserId():
    pass

#Post a message in a chat
def postMessageByChatId():
    pass


