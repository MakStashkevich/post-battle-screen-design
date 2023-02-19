import {useEffect} from 'react';
import anime from "animejs";

const useAnime = (params: anime.AnimeParams) => {
    return useEffect(() => {
        anime(params);
    }, [params]);
};

export default useAnime;