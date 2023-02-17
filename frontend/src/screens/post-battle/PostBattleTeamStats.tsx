import style from "../../style/screens/PostBattleScreen.module.scss";
import TrophySvg from "./icons/TrophySvg";
import DislikeSvg from "./icons/DislikeSvg";
import {convertNumber} from "../../utils/math";
import React from "react";

interface PostBattleTeamProps {
    won: boolean;
    teamName: string;
    teamScore: number;
}

const PostBattleTeamStats = ({won, teamName, teamScore}: PostBattleTeamProps) => {
    return (
        <div className={style.team}>
            <div className={style.teamIcon}>
                {won ? <TrophySvg/> : <DislikeSvg/>}
            </div>
            <div className={style.teamCol}>
                <span className={style.teamGameStatus}>
                    {won ? 'Winner' : 'Loser'}
                </span>
                <span className={style.teamScore}>
                    {convertNumber(teamScore)} pts
                </span>
                <span className={style.teamName}>
                    {teamName}
                </span>
            </div>
        </div>
    )
}

export default PostBattleTeamStats;