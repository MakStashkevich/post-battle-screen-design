import style from "./PostBattleHeader.module.scss";
import TrophySvg from "../icons/TrophySvg";
import DislikeSvg from "../icons/DislikeSvg";
import {convertNumber} from "../../../lib/math-helper";
import React from "react";

interface PostBattleHeaderTeamProps {
    won: boolean;
    teamName: string;
    teamScore: number;
}

const PostBattleHeaderTeam = ({won, teamName, teamScore}: PostBattleHeaderTeamProps) => {
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

export default PostBattleHeaderTeam;