from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4
from typing import List, Optional
from enum import Enum


class MessageType(str, Enum):
    ai = "ai"
    user = "user"


class Message(BaseModel):
    id: str = Field(default_factory=lambda: uuid4().hex)
    type: MessageType
    content:str=Field(default="")
    
class Code(BaseModel):
    html: str = Field(default="", min_length=0)
    css: str = Field(default="", min_length=0)
    js: str = Field(default="", min_length=0)

class Chat(BaseModel):
    userId: str
    messages: List[Message] = []
    code: Optional[Code] = None
    createdAt: int = Field(default_factory=datetime.now)