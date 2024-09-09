import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

from dotenv import load_dotenv
load_dotenv() 

API_KEY=os.getenv("GEMINI_API_KEY")

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
            "you are a web developer who gives html and css code based on the user's request only give html and css no comments no intro no explanation",
        ),
        ("user", "{input}")
    ]
)

# create chain
chain = prompt | model

# run chain
res = chain.invoke({"input":"create home page with navbar and banner"})
print(res.content)