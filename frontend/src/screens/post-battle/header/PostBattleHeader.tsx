import React from 'react';
import style from "./PostBattleHeader.module.scss";
import PostBattleHeaderTeam from "./PostBattleHeaderTeam";
import {getRandomInt} from "../../../utils/math";

interface TeamDataObject {
    name: string;
    score: number;
}

const PostBattleHeader = () => {
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
        <div className={style.head}>
            {firstTeam && <PostBattleHeaderTeam
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
            {lastTeam && <PostBattleHeaderTeam
                won={lastTeam.name === wonTeam.name}
                teamName={lastTeam.name}
                teamScore={lastTeam.score}
            />}
        </div>
    );
};

export default PostBattleHeader;