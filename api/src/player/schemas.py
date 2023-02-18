from pydantic import BaseModel


class BattlePlayerSchema(BaseModel):
    id: int
    username: str
    score: int
    alive: bool = False
    kills: int = 0
    deaths: int = 0
