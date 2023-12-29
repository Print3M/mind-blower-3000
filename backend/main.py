from fastapi import FastAPI
from src.enums import Language
from src.io.cooljugator import Cooljugator


app = FastAPI()


@app.get("/conjugation/search", description="Search conjugation DB")
async def conjugation_search(lang: Language, word: str):
    cool = Cooljugator(lang)
    items = cool.search(word)

    return items


@app.get("/conjugation/word", description="Get conjugation data")
async def conjugation_word(lang: Language, word: str):
    cool = Cooljugator(lang)
    item = cool.get_conjugation(word)

    return item
