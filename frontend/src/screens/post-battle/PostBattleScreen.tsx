import React from 'react';
import style from '../../style/screens/PostBattleScreen.module.scss';
import {getRandomInt} from "../../utils/math";
import PostBattleTeamStats from "./PostBattleTeamStats";

interface TeamDataObject {
    name: string;
    score: number;
}

const PostBattleScreen = () => {
    const teams: TeamDataObject[] = [
        {
            name: 'Team Name 1',
            score: getRandomInt(0, 123456789)
        },
        {
            name: 'Team Name 2',
            score: getRandomInt(0, 123456789)
        }
    ];
    const firstTeam = teams[0];
    const lastTeam = teams[1];
    if (!firstTeam || !lastTeam) {
        throw new Error('Teams not found.');
    }
    const wonTeam: TeamDataObject = firstTeam.score > lastTeam.score ? firstTeam : lastTeam;
    return (
        <div className={style.container}>
            <div className={style.head}>
                {firstTeam && <PostBattleTeamStats
                    won={firstTeam.name === wonTeam.name}
                    teamName={firstTeam.name}
                    teamScore={firstTeam.score}
                />}
                <div className={style.headInfo}>
                    <span className={style.headInfoTitle}>
                        Battle end
                    </span>
                    <span className={style.headInfoSubtitle}>
                        {wonTeam.name} is Win!
                    </span>
                </div>
                {lastTeam && <PostBattleTeamStats
                    won={lastTeam.name === wonTeam.name}
                    teamName={lastTeam.name}
                    teamScore={lastTeam.score}
                />}
            </div>
        </div>
    );
};

export default PostBattleScreen;