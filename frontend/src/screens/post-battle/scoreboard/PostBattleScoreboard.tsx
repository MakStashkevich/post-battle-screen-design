import React, {useEffect, useRef, useState} from 'react';
import style from "./PostBattleScoreboard.module.scss";
import {convertNumber, getRandomInt} from "../../../lib/math-helper";
import PostBattleTooltipProvider from "../tooltip/PostBattleTooltipProvider";
import usePostBattleTooltip from "../tooltip/usePostBattleTooltip";
import {PostBattleProps} from "../PostBattleScreen";
import {BattlePlayerSchema, BattleTeamSchema} from "../../../api/methods/battleMethod";
import PlayerAvatar from "../avatar/PlayerAvatar";
import HeartSvg from "../icons/HeartSvg";
import SkullHeadSvg from "../icons/SkullHeadSvg";
import useAnime from "../../../hooks/useAnime";
import anime from "animejs";

interface ScoreboardLineProps {
    player: BattlePlayerSchema;
    currentPlayer: boolean;
    hideBorder: boolean;
}

const ScoreboardLine = ({player, currentPlayer, hideBorder}: ScoreboardLineProps) => {
    const {setTooltipPlayer} = usePostBattleTooltip();
    return (
        <tr
            onMouseEnter={() => setTooltipPlayer(player, currentPlayer)}
            data-hide-border={hideBorder}
            data-current={currentPlayer}
        >
            <td>{player.rank}</td>
            <td><PlayerAvatar src={player.avatar_url}/>{player.username + (currentPlayer ? ' (Me)' : '')}</td>
            <td>{player.alive ? <HeartSvg/> : <SkullHeadSvg/>}{player.alive ? 'Alive' : 'Dead'}</td>
            <td>{convertNumber(player.score) + ' pts'}</td>
        </tr>
    )
}

interface ScoreboardTeamProps {
    team: BattleTeamSchema;
}

const ScoreboardTeamTable = ({team}: ScoreboardTeamProps) => {
    const bodyRef = useRef<HTMLTableSectionElement>(null);
    const tableId = `post-battle-scoreboard-${team.id}`
    const [currentPlayerRank] = useState<number>(team.id === 1 ? getRandomInt(5, 50) : 0);
    useAnime({
        targets: `#${tableId}`,
        opacity: [0, 1],
        translateX: [team.id === 1 ? -50 : 50, 0],
        easing: "easeInOutQuart",
        duration: 1500,
    });
    useEffect(() => {
        // Animation scroll to currentPlayer profile
        if (bodyRef.current && currentPlayerRank > 0) {
            let animateScrollData = {
                top: 0,
            };
            anime({
                targets: animateScrollData,
                top: (55 + 1) * (currentPlayerRank - 1), // 55px row height + 1px bottom line
                easing: "easeInOutQuart",
                duration: 1500,
                delay: 1000,
                update: () => bodyRef.current?.scroll(animateScrollData)
            });
        }
    }, [currentPlayerRank]);
    return (
        <PostBattleTooltipProvider currentRef={bodyRef}>
            <table id={tableId} className={style.scoreTable}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Status</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody ref={bodyRef}>
                {team.players.map(player =>
                    <ScoreboardLine
                        key={player.id}
                        player={player}
                        currentPlayer={currentPlayerRank === player.rank}
                        hideBorder={currentPlayerRank - 1 === player.rank || currentPlayerRank === player.rank}
                    />
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