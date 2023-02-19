import React, {useRef} from 'react';
import style from "./PostBattleScoreboard.module.scss";
import {convertNumber} from "../../../lib/math-helper";
import PostBattleTooltipProvider from "../tooltip/PostBattleTooltipProvider";
import usePostBattleTooltip from "../tooltip/usePostBattleTooltip";
import {PostBattleProps} from "../PostBattleScreen";
import {BattlePlayerSchema, BattleTeamSchema} from "../../../api/methods/battleMethod";
import PlayerAvatar from "../avatar/PlayerAvatar";
import HeartSvg from "../icons/HeartSvg";
import SkullHeadSvg from "../icons/SkullHeadSvg";

const ScoreboardLine = ({player}: { player: BattlePlayerSchema }) => {
    const {setTooltipPlayer} = usePostBattleTooltip();
    return (
        <tr onMouseEnter={() => setTooltipPlayer(player)}>
            <td>{player.rank}</td>
            <td><PlayerAvatar src={player.avatar_url}/>{player.username}</td>
            <td>{player.alive ? <HeartSvg/> : <SkullHeadSvg/>}{player.alive ? 'Alive' : 'Dead'}</td>
            <td>{convertNumber(player.score) + ' pts'}</td>
        </tr>
    )
}

const ScoreboardTeamTable = ({team}: { team: BattleTeamSchema }) => {
    const currentRef = useRef<HTMLTableSectionElement>(null);
    return (
        <PostBattleTooltipProvider currentRef={currentRef}>
            <table className={style.scoreTable}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Status</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody ref={currentRef}>
                {team.players.map(player =>
                    <ScoreboardLine key={player.id} player={player}/>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <th>Total</th>
                    <th>{convertNumber(team.total_score)}</th>
                </tr>
                </tfoot>
            </table>
        </PostBattleTooltipProvider>
    )
}

const PostBattleScoreboard = ({teams}: PostBattleProps) => {
    return teams && teams[0] && teams[1] ? (
        <div className={style.scoreboard}>
            <ScoreboardTeamTable team={teams[0]}/>
            <ScoreboardTeamTable team={teams[1]}/>
        </div>
    ) : <React.Fragment/>;
};

export default PostBattleScoreboard;