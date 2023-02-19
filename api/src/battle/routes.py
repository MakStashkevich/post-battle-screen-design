from fastapi import APIRouter

from .requests import BattleRequest
from .schemas import PostBattleTeamSchema

router = APIRouter(prefix="/battle")


@router.get("/endgame/", response_model=list[PostBattleTeamSchema])
def get_post_battle_results():
    return BattleRequest.get_teams_post_battle()
