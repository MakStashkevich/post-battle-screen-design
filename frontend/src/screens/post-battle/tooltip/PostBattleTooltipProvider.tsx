import React, {createContext, RefObject, useEffect, useRef, useState} from 'react';
import style from "./PostBattleTooltip.module.scss";
import {BattlePlayerSchema} from "../../../api/methods/battleMethod";
import {convertNumber} from "../../../lib/math-helper";

export interface TooltipContextSchema {
    setTooltipPlayer: (player: BattlePlayerSchema) => void;
}

let currentX = 0, currentY = 0;
let timeout: NodeJS.Timeout | undefined;

const onMouseMoveTooltip = (event: MouseEvent) => {
    currentX = event.clientX;
    currentY = event.clientY;
}

export const TooltipContext = createContext<TooltipContextSchema | undefined>(undefined);

interface TooltipProviderProps {
    children?: React.ReactNode;
    currentRef: RefObject<HTMLElement>;
}

const PostBattleTooltipProvider = ({children, currentRef}: TooltipProviderProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [playerInfo, setPlayerInfo] = useState<BattlePlayerSchema>();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const tooltipContentRef = useRef<HTMLDivElement>(null);
    const clearTooltip = () => {
        setShow(false);
        if (timeout) {
            clearTimeout(timeout);
        }
    }
    useEffect(() => {
        if (currentRef) {
            currentRef.current?.addEventListener('mouseleave', (e: MouseEvent) => {
                const tooltipContentChildren: (HTMLElement | EventTarget | null)[] = Array.from(
                    tooltipContentRef.current?.children ?? []
                );
                if (
                    tooltipRef.current !== e.relatedTarget &&
                    tooltipContentRef.current !== e.relatedTarget &&
                    !tooltipContentChildren.includes(e.relatedTarget)
                ) {
                    clearTooltip();
                }
            });
        }
        document.addEventListener('mousemove', onMouseMoveTooltip);
        return () => {
            document.removeEventListener('mousemove', onMouseMoveTooltip);
        }
    }, [currentRef]);
    const setTooltipPlayer = (player: BattlePlayerSchema) => {
        clearTooltip();
        timeout = setTimeout(() => {
            setPlayerInfo(player);
            setShow(true);
            if (tooltipRef && tooltipRef.current && tooltipRef.current.style) {
                tooltipRef.current.style.top = (currentY - 130) + 'px';
                tooltipRef.current.style.left = (currentX - 100) + 'px';
            }
        }, 1000);
    };
    let stylesData = [style.tooltipInfo];
    if (show) {
        stylesData.push(style.tooltipInfoShow);
    }
    return (
        <TooltipContext.Provider value={{setTooltipPlayer}}>
            <div className={style.tooltip}>
                {children}
                <div className={stylesData.join(' ')} ref={tooltipRef}>
                    {playerInfo && (
                        <div className={style.tooltipContent} ref={tooltipContentRef}>
                            <span>{playerInfo.username}</span>
                            <span><b>Kills:</b> {convertNumber(playerInfo.kills)}</span>
                            <span><b>Deaths:</b> {convertNumber(playerInfo.deaths)}</span>
                            <button>Add to friend</button>
                        </div>
                    )}
                </div>
            </div>
        </TooltipContext.Provider>
    )
}

export default PostBattleTooltipProvider;