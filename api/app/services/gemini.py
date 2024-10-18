import os
from dotenv import load_dotenv
from ..models.chat import Response

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_redis import RedisChatMessageHistory
from langchain_core.output_parsers import PydanticOutputParser

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL")
GENERATION_CONFIG = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

# session history
def getRedisHistory(session_id: str):
    return RedisChatMessageHistory(session_id, redis_url=REDIS_URL)

# model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", generation_config=GENERATION_CONFIG, api_key=API_KEY)

# Parser
parser = PydanticOutputParser(pydantic_object=Response)

# prompt
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "you are a web developer who gives html, css and js code along with explanation based on the user's request. Only give html, css, js and explanation in json format with keys html, css, js and explanation.",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("user", "{input}"),
    ]
)

# chain
chain = prompt | model

runnableWithHistory = RunnableWithMessageHistory(
    chain,
    getRedisHistory,
    input_messages_key="input",
    history_messages_key="history",
)

# Run chain and parse the response explicitly
async def getAIResponse(prompt: str,sessionId: str = "default_id") -> Response:
    res = runnableWithHistory.invoke(
        {"input": prompt},
        config={"configurable": {"session_id": sessionId}},
    )
    parsedResponse = parser.parse(res.content)
    return parsedResponse

# driver code
if __name__ == "__main__":
    import asyncio

    async def main():
        response = await getAIResponse("I want a website with a contact form", "test_session_id")
        print(response)

    asyncio.run(main())