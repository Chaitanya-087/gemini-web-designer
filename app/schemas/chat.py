def individualChat(chat):
    return {
        "id": str(chat["_id"]),
        "user_id": chat["user_id"],
        "messages": chat["messages"],
    }

def allChats(chats):
    return [individualChat(chat) for chat in chats]