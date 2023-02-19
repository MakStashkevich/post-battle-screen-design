import os
import random

_cached_avatars_table: list[str] | None = None


def get_avatars_table() -> list[str] | None:
    global _cached_avatars_table
    if _cached_avatars_table is not None:
        return _cached_avatars_table

    # Scrapper 100 random Steam avatars
    from urllib import request
    from bs4 import BeautifulSoup
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        }
        webpage = request.urlopen(request.Request('https://randomavatar.com', headers=headers)).read()
    except Exception:
        return None
    soup = BeautifulSoup(webpage, "lxml")
    icons = soup.select('#icons div[class^="col-sm-2 col-xs-3"] a img[class^="img-responsive MainSpace RAFade"]')
    if not icons:
        return None

    avatars_table = []
    for icon in icons:
        try:
            avatars_table.append(icon['src'])
        except Exception:
            continue

    if len(avatars_table) < 1:
        _cached_avatars_table = None
    else:
        _cached_avatars_table = avatars_table

    return _cached_avatars_table


def clear_avatars_table_cache():
    global _cached_avatars_table
    _cached_avatars_table = None


class FakeBaseRequest:
    @staticmethod
    def get_team_name(team_id: int) -> str:
        names = [
            'Raging Lightning',
            'Retro Geckos',
            'Spinning Champions',
            'Shark Mavericks',
            'Quicksilver Predators',
            'Pink Hawks',
            'Delta Sharpshooters',
            'Toxic Spiders',
            'Knockout Ninjas',
            'Gecko Checkers'
        ]
        return random.choice(names) + f" #{team_id}"

    @staticmethod
    def get_player_username(player_id: int) -> str:
        undefined_username = f'username_{player_id}'
        path_filename = os.path.join(os.path.dirname(__file__), 'usernames.txt')
        if not os.path.exists(path_filename):
            return undefined_username
        with open(path_filename, encoding='utf-8') as f:
            try:
                username = f.readlines()[player_id - 1].rstrip()
            except Exception:
                username = None
        return username if username is not None else undefined_username

    @staticmethod
    def get_player_score(player_id: int) -> int:
        return random.randint(9 * player_id, 999 * player_id)

    @staticmethod
    def get_player_kills(player_id: int) -> int:
        return random.randint(player_id, 19 * player_id)

    @staticmethod
    def get_player_deaths(player_id: int) -> int:
        return random.randint(player_id, 19 * player_id)

    @staticmethod
    def is_player_alive(player_id: int) -> bool:
        return random.choice([True, False]) if player_id % 2 == 0 else random.choice([True, False])

    @staticmethod
    def get_player_avatar_url(player_id: int) -> str | None:
        avatars_base = get_avatars_table()
        if avatars_base is None:
            return None
        try:
            return avatars_base[player_id - 1]
        except Exception:
            return None
