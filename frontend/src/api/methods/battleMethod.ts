import {apiGet} from "../apiFetch";
import {IS_DEVELOPMENT, IS_IGNORE_API} from "../../lib/dictionary";
import {getRandomInt} from "../../lib/math-helper";

export interface BattlePlayerSchema {
    id: number;
    rank: number;
    username: string;
    avatar_url?: string;
    score: number;
    alive: boolean;
    kills: number;
    deaths: number;
}

export interface BattleTeamSchema {
    id: number;
    name: string;
    won: boolean;
    total_score: number;
    players: BattlePlayerSchema[];
}

function getFakeTeamPlayers(offsetId: number = 0): BattlePlayerSchema[] {
    const teamPlayers: BattlePlayerSchema[] = [];
    for (let i = 0; i < 50; i++) {
        const playerId = i + 1 + offsetId;
        teamPlayers.push({
            id: playerId,
            rank: i + 1,
            username: 'Nickname_' + playerId,
            score: 9999 - (i * 99),
            alive: Boolean(Math.random() < 0.5),
            kills: getRandomInt(0, 12345),
            deaths: getRandomInt(0, 12345),
        })
    }
    return teamPlayers;
}

function getFakeTeam(id: number): BattleTeamSchema {
    const teamPlayers = getFakeTeamPlayers((id - 1) * 50);
    let totalScore = 0;
    teamPlayers.map(v => totalScore += v.score)
    return {
        id: id,
        name: 'Fake Team #' + id,
        won: false,
        total_score: totalScore,
        players: teamPlayers,
    }
}

export async function getPostBattleData(): Promise<BattleTeamSchema[]> {
    if (IS_DEVELOPMENT && IS_IGNORE_API) {
        const teams: BattleTeamSchema[] = [
            getFakeTeam(1),
            getFakeTeam(2),
        ];
        if (teams[0].total_score > teams[1].total_score) {
            teams[0].won = true;
        } else if (teams[0].total_score < teams[1].total_score) {
            teams[1].won = true;
        }
        return teams;
    }
    return await apiGet<BattleTeamSchema[]>(`/v1/battle/endgame`)
}