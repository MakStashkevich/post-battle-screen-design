import os
import random


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