import React, {createContext, RefObject, useEffect, useRef, useState} from 'react';
import style from "./PostBattleTooltip.module.scss";

export interface TooltipContextSchema {
    setTooltip: (value: string) => void;
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
    const [text, setText] = useState<string>('');
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
    const setTooltip = (text: string) => {
        clearTooltip();
        timeout = setTimeout(() => {
            setText(text);
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
        <TooltipContext.Provider value={{setTooltip}}>
            <div className={style.tooltip}>
                {children}
                <div className={stylesData.join(' ')} ref={tooltipRef}>
                    <div className={style.tooltipContent} ref={tooltipContentRef}>
                        <span>{text}</span>
                        <span><b>Kills:</b> 102</span>
                        <span><b>Deaths:</b> 12</span>
                        <button>Add to friend</button>
                    </div>
                </div>
            </div>
        </TooltipContext.Provider>
    )
}

export default PostBattleTooltipProvider;