import React from 'react';
import style from './AppScreen.module.scss';
import PostBattleScreen from "./post-battle/PostBattleScreen";

const AppScreen = () => {
    return (
        <React.Fragment>
            <div className={style.container}>
                <PostBattleScreen/>
            </div>
            <div className={style.mobileContainer}>
                <div className={style.infoRow}>
                    <span className={style.infoTitle}>
                        Sorry...
                    </span>
                    <span className={style.infoSubtitle}>
                        Site not working on small devices.
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AppScreen;