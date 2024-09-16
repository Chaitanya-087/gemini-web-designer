from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["chat_db"]
chatsCollection = db["chats"]
userCollection = db["users"]

export = chatsCollection
export = userCollection