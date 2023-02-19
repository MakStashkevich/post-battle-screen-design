from .schemas import PostBattleTeamSchema
from ..base.requests import FakeBaseRequest, clear_avatars_table_cache
from ..player.requests import PlayerRequest


class BattleRequest:
    @staticmethod
    def get_team(team_id: int, offset_players: int = 0) -> PostBattleTeamSchema:
        players_list = []
        total_score = 0
        # get all players
        for player_id in range(50):
            player = PlayerRequest.get_player((player_id + 1) + offset_players)
            total_score += player.score
            players_list.append(player)
        # sort players by score
        players_list.sort(key=lambda p: p.score, reverse=True)
        # paste top rank
        for rank in range(len(players_list)):
            players_list[rank].rank = rank + 1
        # combine data
        data = {
            'id': team_id,
            'name': FakeBaseRequest.get_team_name(),
            'total_score': total_score,
            'players': players_list,
        }
        return PostBattleTeamSchema(**data)

    @staticmethod
    def get_teams_post_battle() -> list[PostBattleTeamSchema]:
        clear_avatars_table_cache()
        teams = [BattleRequest.get_team(1, 0), BattleRequest.get_team(2, 50)]
        if teams[0].total_score > teams[1].total_score:
            teams[0].won = True
        elif teams[0].total_score < teams[1].total_score:
            teams[1].won = True
        return teams
