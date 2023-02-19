from .schemas import BattlePlayerSchema
from ..base.requests import FakeBaseRequest


class PlayerRequest:
    @staticmethod
    def get_player(player_id: int) -> BattlePlayerSchema:
        data = {
            'id': player_id,
            'username': FakeBaseRequest.get_player_username(player_id),
            'avatar_url': FakeBaseRequest.get_player_avatar_url(player_id),
            'score': FakeBaseRequest.get_player_score(player_id),
            'alive': FakeBaseRequest.is_player_alive(player_id),
            'kills': FakeBaseRequest.get_player_kills(player_id),
            'deaths': FakeBaseRequest.get_player_deaths(player_id)
        }
        return BattlePlayerSchema(**data)
