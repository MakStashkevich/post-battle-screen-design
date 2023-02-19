import React from 'react';
import style from './PlayerAvatar.module.scss';
import usePreloadImage from "../../../hooks/usePreloadImage";

const PlayerAvatar = ({src}: {src?: string}) => {
    const isLoadedImage = usePreloadImage(src ?? '');
    return src && isLoadedImage ? (
        <img className={style.avatarImage} src={src} alt={'Player avatar'}/>
    ) : (
        <div className={style.avatarGradient}/>
    );
};

export default PlayerAvatar;