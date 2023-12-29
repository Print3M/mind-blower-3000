from typing import TypedDict
import bs4
from .utils import get_html_source, get_table_item
from src.enums import Language

all_persons = tuple[str, str, str, str, str, str]


class MK_Conjugation(TypedDict):
    present: all_persons
    future: all_persons
    past_perfect: all_persons
    past_imperfect: all_persons
    past_aorist: all_persons
    verbal_noun: str
    adverbial_participle: str
    adjectival_participle: str


def mk_scraper(word: str) -> MK_Conjugation:
    html = get_html_source(Language.MK, word)
    soup = bs4.BeautifulSoup(html, "html.parser")

    return {
        "present": (
            get_table_item(soup, "present1"),
            get_table_item(soup, "present2"),
            get_table_item(soup, "present3"),
            get_table_item(soup, "present4"),
            get_table_item(soup, "present5"),
            get_table_item(soup, "present6"),
        ),
        "future": (
            get_table_item(soup, "future1"),
            get_table_item(soup, "future2"),
            get_table_item(soup, "future3"),
            get_table_item(soup, "future4"),
            get_table_item(soup, "future5"),
            get_table_item(soup, "future6"),
        ),
        "past_perfect": (
            get_table_item(soup, "perfect_1M"),
            get_table_item(soup, "perfect_2M"),
            get_table_item(soup, "perfect_3M").lstrip("е "),
            get_table_item(soup, "perfect_4"),
            get_table_item(soup, "perfect_5"),
            get_table_item(soup, "perfect_6").lstrip("сум "),
        ),
        "past_aorist": (
            get_table_item(soup, "aorist1"),
            get_table_item(soup, "aorist2"),
            get_table_item(soup, "aorist3"),
            get_table_item(soup, "aorist4"),
            get_table_item(soup, "aorist5"),
            get_table_item(soup, "aorist6"),
        ),
        "past_imperfect": (
            get_table_item(soup, "imperfect1"),
            get_table_item(soup, "imperfect2"),
            get_table_item(soup, "imperfect3"),
            get_table_item(soup, "imperfect4"),
            get_table_item(soup, "imperfect5"),
            get_table_item(soup, "imperfect6"),
        ),
        "verbal_noun": get_table_item(soup, "verbal_noun"),
        "adverbial_participle": get_table_item(soup, "adverbial_participle"),
        "adjectival_participle": get_table_item(soup, "adjectival_participle"),
    }
