import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_redis import RedisChatMessageHistory
from langchain_core.output_parsers import PydanticOutputParser
from dotenv import load_dotenv
from ..models import AIResponse, Prompt

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = "redis://localhost:8009/0"

# Session history
def get_redis_history(session_id: str):
    return RedisChatMessageHistory(session_id, redis_url=REDIS_URL)

# Create model
generation_config = {
    "temperature": 2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", generation_config=generation_config, api_key=API_KEY)

# Parser
parser = PydanticOutputParser(pydantic_object=AIResponse)

# Create prompt
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

# Create chain (without ParserPlaceholder)
chain = prompt | model

runnable_with_history = RunnableWithMessageHistory(
    chain,
    get_redis_history,
    input_messages_key="input",
    history_messages_key="history",
)

# Run chain and parse the response explicitly
async def runResponse(user_prompt: Prompt,sessionID: str) -> AIResponse:
    # Run the model chain with input and session ID
    response1 = runnable_with_history.invoke(
        {"input": user_prompt.text},
        config={"configurable": {"session_id": sessionID}},
    )
    
    # Manually parse the model response into the AIResponse Pydantic object
    parsed_response = parser.parse(response1.content)

    # Return the parsed Pydantic object (AIResponse)
    return parsed_response
