import React from 'react';
import style from './PlayerAvatar.module.scss';

const PlayerAvatar = ({src}: {src?: string}) => {
    return src ? (
        <img className={style.avatarImage} src={src} alt={'Player avatar'}/>
    ) : (
        <div className={style.avatarGradient}/>
    );
};

export default PlayerAvatar;