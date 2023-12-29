from src.enums import Language
import requests
from ..consts import COOLJUGATOR_WEB_ROOT
import bs4
from src.utils import get_user_agent


class NotFoundError(Exception):
    pass


def get_html_source(lang: Language, word: str):
    url = f"{COOLJUGATOR_WEB_ROOT}/{lang.value}/{word}"
    resp = requests.get(url, headers={"User-Agent": get_user_agent()})

    print(resp.request.headers)

    if resp.status_code != 200:
        raise AssertionError(
            f"Something went wrong while requesting Cooljugator website: {url}"
        )

    if "404" in resp.url:
        raise NotFoundError(f"Requested verb has not been found in Cooljugator: {url}")

    return resp.content.decode("utf-8")


def get_table_item(soup: bs4.BeautifulSoup, id: str):
    el = soup.find(id=id)

    if type(el) == bs4.Tag:
        child: bs4.Tag = el.find_all("div", {"class": "meta-form"})[0]
        text = child.get_text()

        return text if len(text) > 1 else ""

    return ""
