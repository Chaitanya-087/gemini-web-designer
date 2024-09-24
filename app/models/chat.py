from pydantic import BaseModel, Field
from typing import List, Optional, Union, Literal
from datetime import datetime

class Prompt(BaseModel):
    text: str

class AIResponse(BaseModel):
    html: str
    css: str
    js: str
    explanation: str

class ChatMessage(BaseModel):
    userMessage: Prompt
    aiMessage: AIResponse
    
class Chat(BaseModel):
    user_id: str
    messages: List[ChatMessage] = []
    created_at: int = Field(default_factory=lambda: int(datetime.timestamp(datetime.now())))
    updated_at: int = Field(default_factory=lambda: int(datetime.timestamp(datetime.now())))