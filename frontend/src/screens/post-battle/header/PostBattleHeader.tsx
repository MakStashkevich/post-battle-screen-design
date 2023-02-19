import React from 'react';
import style from "./PostBattleHeader.module.scss";
import PostBattleHeaderTeam from "./PostBattleHeaderTeam";
import {PostBattleProps} from "../PostBattleScreen";
import useAnime from "../../../hooks/useAnime";

const PostBattleHeader = ({teams}: PostBattleProps) => {
    let firstTeam, lastTeam, wonTeam;
    if (teams && teams.length >= 2) {
        firstTeam = teams[0];
        lastTeam = teams[1];
        wonTeam = teams[0].won ? teams[0] : teams[1];
    }
    const headerId = 'post-battle-header';
    useAnime({
        targets: `#${headerId}`,
        opacity: [0, 1],
        translateY: [-40, 0],
        easing: 'easeInOutQuart',
        duration: 1500,
    });
    return (
        <div id={headerId} className={style.head}>
            {firstTeam && lastTeam && wonTeam ? (
                <React.Fragment>
                    <PostBattleHeaderTeam
                        won={firstTeam.name === wonTeam.name}
                        teamName={firstTeam.name}
                        teamScore={firstTeam.total_score}
                    />
                    <div className={style.headInfo}>
                        <span className={style.headInfoTitle}>Battle end</span>
                        <span className={style.headInfoSubtitle}>{wonTeam.name} is Win!</span>
                    </div>
                    <PostBattleHeaderTeam
                        won={lastTeam.name === wonTeam.name}
                        teamName={lastTeam.name}
                        teamScore={lastTeam.total_score}
                    />
                </React.Fragment>
            ) : (
                <div className={style.headInfo}>
                    <span className={style.headInfoTitle}>Data not found</span>
                    <span className={style.headInfoSubtitle}>Please, try reload page</span>
                </div>
            )}
        </div>
    );
};

export default PostBattleHeader;