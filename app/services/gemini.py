import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate,  MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_redis import RedisChatMessageHistory
from langchain_core.output_parsers import JsonOutputParser
from dotenv import load_dotenv
from ..schemas.ai_response import AIResponse


load_dotenv() 

API_KEY=os.getenv("GEMINI_API_KEY")
REDIS_URL = "redis://localhost:8009/0"

#session history
def get_redis_history(session_id: str) -> BaseChatMessageHistory:
    return RedisChatMessageHistory(session_id, redis_url=REDIS_URL)

# create model
generation_config = {
  "temperature": 2,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}
model=ChatGoogleGenerativeAI(model="gemini-1.5-flash", generation_config=generation_config,api_key=API_KEY)

#parser
parser = JsonOutputParser(pydantic_object=AIResponse)


# create prompt
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "you are a web developer who gives html and css code based on the user's request only give html and css no comments no intro no explanation",
            # "you are a friend"
        ),
        MessagesPlaceholder(variable_name="history"),

        ("user", "{input}"),
    ]
)

# create chain
chain = prompt | model | parser

runnable_with_history = RunnableWithMessageHistory(
    chain,
    get_redis_history,
    input_messages_key="input",
    history_messages_key="history",
)

async def test(msg):
    return msg

# run chain
async def runResponse(prompt):
    response1 = await runnable_with_history.invoke(
        {"input": prompt},
        config={"configurable": {"session_id": "2"}},
    )
    response = response1.content
    print(response)
    return('mg')