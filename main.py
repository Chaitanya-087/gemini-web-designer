import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import RedisChatMessageHistory


from dotenv import load_dotenv
load_dotenv() 

API_KEY=os.getenv("GEMINI_API_KEY")
REDIS_URL = "redis://localhost:6379/0"

#session history
def get_session_history(session_id):
    return RedisChatMessageHistory(session_id, url=REDIS_URL)

# create model
generation_config = {
  "temperature": 2,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}
model=ChatGoogleGenerativeAI(model="gemini-1.5-flash", generation_config=generation_config,api_key=API_KEY)

# create prompt
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            # "you are a web developer who gives html and css code based on the user's request only give html and css no comments no intro no explanation",
            "you are a friend"
        ),
        ("user", "{input}")
    ]
)

# create chain
chain = prompt | model

runnable_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

# run chain
print(runnable_with_history.invoke({"input":"wat is my name"}, config={"configurable": {"session_id": "1"}}))
