import {useEffect, useState} from 'react';

const usePreloadImage = (src: string) => {
    const [sourceLoaded, setSourceLoaded] = useState<string>('');
    useEffect(() => {
        if (src === '') {
            setSourceLoaded(src);
            return;
        }
        const img = new Image();
        img.src = src;
        img.onload = () => setSourceLoaded(src);
    }, [src])
    return Boolean(sourceLoaded === src);
}

export default usePreloadImage;