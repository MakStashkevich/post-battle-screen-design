import React from 'react';
import style from "./PostBattleScoreboard.module.scss";
import {convertNumber, getRandomInt} from "../../../utils/math";

interface ScoreboardLineProps {
    id: number;
    username: string;
    alive: boolean;
    score: number;
}

const ScoreboardLine = ({id, username, alive, score}: ScoreboardLineProps) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{alive ? 'Alive' : 'Dead'}</td>
            <td>{convertNumber(score) + ' pts'}</td>
        </tr>
    )
}

const ScoreboardTeamTable = () => {
    const teamUsers: ScoreboardLineProps[] = [];
    for (let i = 0; i < 50; i++) {
        teamUsers.push({
            id: i + 1,
            username: 'Nickname',
            alive: Boolean(Math.random() < 0.5),
            score: getRandomInt(0, 12345678)
        })
    }
    let totalScore = 0;
    teamUsers.map(v => totalScore += v.score)
    return (
        <table className={style.scoreTable}>
            <thead>
            <tr>
                <th>#</th>
                <th>Player</th>
                <th>Status</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {teamUsers.map((v) =>
                <ScoreboardLine id={v.id} username={v.username} alive={v.alive} score={v.score}/>
            )}
            </tbody>
            <tfoot>
            <tr>
                <th>Total</th>
                <th>{convertNumber(totalScore)}</th>
            </tr>
            </tfoot>
        </table>
    )
}

const PostBattleScoreboard = () => {
    return (
        <div className={style.scoreboard}>
            <ScoreboardTeamTable/>
            <ScoreboardTeamTable/>
        </div>
    );
};

export default PostBattleScoreboard;