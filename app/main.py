from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import hello
from .routers import llm_router

app = FastAPI()

origins=[
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(hello.router)
app.include_router(llm_router.router)