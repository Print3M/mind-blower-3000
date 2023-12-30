from fastapi import FastAPI
from src.enums import Language
from src.io.cooljugator import Cooljugator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost',
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/conjugation/search", description="Search conjugation DB")
async def conjugation_search(lang: Language, word: str):
    if len(word) == 0:
        resp: list[str] = []
        
        return resp

    cool = Cooljugator(lang)
    items = cool.search(word)

    return items


@app.get("/conjugation/word", description="Get conjugation data")
async def conjugation_word(lang: Language, word: str):
    

    cool = Cooljugator(lang)
    item = cool.get_conjugation(word)

    return item
