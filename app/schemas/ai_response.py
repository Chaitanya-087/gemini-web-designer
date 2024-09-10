from pydantic import BaseModel

class AIResponse(BaseModel):
    html: str
