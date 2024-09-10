from pydantic import BaseModel

class AIResponse(BaseModel):
    html: str
    css: str
    js: str
