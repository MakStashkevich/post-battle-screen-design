import React from 'react';
import style from './PostBattleScreen.module.scss';
import PostBattleHeader from "./header/PostBattleHeader";
import PostBattleScoreboard from "./scoreboard/PostBattleScoreboard";

const PostBattleScreen = () => {
    return (
        <div className={style.container}>
            <PostBattleHeader/>
            <PostBattleScoreboard/>
        </div>
    );
};

export default PostBattleScreen;