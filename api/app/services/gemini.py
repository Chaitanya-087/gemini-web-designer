"""This module is used to interact with the Gemini model."""
from dotenv import dotenv_values

from langchain_google_genai import ChatGoogleGenerativeAI

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import PydanticOutputParser

from langchain_redis import RedisChatMessageHistory

from ..models.chat import Response

config = dotenv_values("/home/bitnap/Desktop/gemni-web-designer/api/.env.development.local")

API_KEY = config.get("GEMINI_API_KEY")
REDIS_URL = config.get("REDIS_URL")

GENERATION_CONFIG = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

# session history
def get_redis_history(session_id: str):
    """Return the chat history for a specific session ID."""
    return RedisChatMessageHistory(session_id, redis_url=REDIS_URL)

# model
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash",
                                generation_config=GENERATION_CONFIG, api_key=API_KEY)

# Parser
parser = PydanticOutputParser(pydantic_object=Response)

# prompt
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "you are a web developer who gives html,\
            css and js code along with explanation based on the user's request. \
            Only give html, css, js and \
            explanation in json format with keys html, css, js and explanation.",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("user", "{input}"),
    ]
)

# chain
chain = prompt | model

runnableWithHistory = RunnableWithMessageHistory(
    chain,
    get_redis_history,
    input_messages_key="input",
    history_messages_key="history",
)

async def get_ai_response(question: str,session_id: str = "default_id") -> Response:
    """Get a response from the Gemini model."""
    res = runnableWithHistory.invoke(
        {"input": question},
        config={"configurable": {"session_id": session_id}},
    )
    parsed_response = parser.parse(res.content)
    return parsed_response

# driver code
if __name__ == "__main__":
    import asyncio

    async def main():
        """driver code"""
        response = await get_ai_response("I want a website with a contact form", "test_session_id")
        print(response)

    asyncio.run(main())
