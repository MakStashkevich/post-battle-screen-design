import React, {useEffect, useState} from 'react';
import style from './PostBattleScreen.module.scss';
import PostBattleHeader from "./header/PostBattleHeader";
import PostBattleScoreboard from "./scoreboard/PostBattleScoreboard";
import {BattleTeamSchema, getPostBattleData} from "../../api/methods/battleMethod";

export interface PostBattleProps {
    teams?: BattleTeamSchema[];
}

const PostBattleScreen = () => {
    const [teams, setTeams] = useState<BattleTeamSchema[]>();
    useEffect(() => {
        getPostBattleData().then(v => setTeams(v));
    }, []);
    return teams && teams[0] && teams[1] ? (
        <div className={style.container}>
            <PostBattleHeader teams={teams}/>
            <PostBattleScoreboard teams={teams}/>
        </div>
    ) : <React.Fragment/>;
};

export default PostBattleScreen;