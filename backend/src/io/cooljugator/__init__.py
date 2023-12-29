from src.enums import Language
import requests
from pydantic import BaseModel
from .consts import COOLJUGATOR_API_ROOT
from .scrapers import get_scraper


class CooljugatorSearchItem(BaseModel):
    title: str
    url: str
    price: str
    description: str


class CooljugatorSearchResult(BaseModel):
    results: list[CooljugatorSearchItem]


class Cooljugator:
    def __init__(self, lang: Language):
        self.lang = lang

    def search(self, word: str):
        url = f"{COOLJUGATOR_API_ROOT}/search/{self.lang.value}/{word}"
        resp = requests.get(url)

        if resp.status_code != requests.codes.ok:
            raise ValueError(f"Cooljugator `{url}` status: {resp.status_code}")

        items = CooljugatorSearchResult(**resp.json()).results
        unique_urls = list({v.url:v for v in items}.values()) # Get unique URLs

        def url_to_word(v: str):
            return v.split("/")[-1]

        return [url_to_word(v.url) for v in unique_urls]

    def get_conjugation(self, word: str):
        scrap_func = get_scraper(self.lang)

        return scrap_func(word)
