from typing import List

from pydantic import BaseModel

from ..player.schemas import BattlePlayerSchema


class PostBattleTeamSchema(BaseModel):
    id: int
    name: str
    won: bool = False
    total_score: int
    players: List[BattlePlayerSchema] = []
