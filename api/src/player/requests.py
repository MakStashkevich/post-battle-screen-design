from .schemas import BattlePlayerSchema
from ..base.requests import FakeBaseRequest


class PlayerRequest:
    @staticmethod
    def get_player(player_id: int) -> BattlePlayerSchema:
        data = {
            'id': player_id,
            'username': FakeBaseRequest.get_player_username(player_id),
            'avatar_url': FakeBaseRequest.get_player_avatar_url(player_id),
            'score': FakeBaseRequest.get_player_score(),
            'alive': FakeBaseRequest.is_player_alive(),
            'kills': FakeBaseRequest.get_player_kills(),
            'deaths': FakeBaseRequest.get_player_deaths()
        }
        return BattlePlayerSchema(**data)
