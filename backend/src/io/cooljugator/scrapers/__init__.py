from .mk import mk_scraper
from typing import Callable, TypedDict
from src.enums import Language

ScrapFunc = Callable[[str], TypedDict]

__scrapers: dict[Language, ScrapFunc] = {
    Language.MK: mk_scraper
}

def get_scraper(lang: Language):
    item = __scrapers.get(Language.MK)

    if item is None:
        raise NotImplementedError(f"Scraper for language `{lang}` is not implemented.")
    
    return item