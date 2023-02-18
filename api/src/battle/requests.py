from .schemas import PostBattleTeamSchema
from ..base.requests import FakeBaseRequest
from ..player.requests import PlayerRequest


class BattleRequest:
    @staticmethod
    def get_team(team_id: int, offset_players: int = 0) -> PostBattleTeamSchema:
        players_list = []
        total_score = 0
        for player_id in range(50):
            player = PlayerRequest.get_player((player_id + 1) + offset_players)
            total_score += player.score
            players_list.append(player)
        data = {
            'id': team_id,
            'name': FakeBaseRequest.get_team_name(team_id),
            'total_score': total_score,
            'players': players_list,
        }
        return PostBattleTeamSchema(**data)

    @staticmethod
    def get_teams_post_battle() -> list[PostBattleTeamSchema]:
        teams = [BattleRequest.get_team(1, 0), BattleRequest.get_team(2, 50)]
        if teams[0].total_score > teams[1].total_score:
            teams[0].won = True
        elif teams[0].total_score < teams[1].total_score:
            teams[1].won = True
        return teams
