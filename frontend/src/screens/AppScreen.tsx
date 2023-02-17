import React from 'react';
import style from './AppScreen.module.scss';
import PostBattleScreen from "./post-battle/PostBattleScreen";

const AppScreen = () => {
    return (
        <div className={style.container}>
            <PostBattleScreen/>
        </div>
    );
};

export default AppScreen;