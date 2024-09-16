from ..schemas.chat import Chat, ChatMessage

tempChats = []

#Get all chats by user
def getChatsByUserId(userId: int):
    return list(filter(lambda chat: chat.userId == userId, tempChats.chats))

#Create a new chat by userId
def createChatByUserId():
    pass

#Post a message in a chat
def postMessageByChatId():
    pass


