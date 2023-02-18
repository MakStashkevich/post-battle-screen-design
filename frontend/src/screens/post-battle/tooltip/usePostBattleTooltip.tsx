import {useContext} from 'react';
import {TooltipContext, TooltipContextSchema} from "./PostBattleTooltipProvider";

const usePostBattleTooltip = () => {
    const ctx = useContext<TooltipContextSchema | undefined>(TooltipContext);
    if (!ctx) {
        throw Error('Tooltip context not found.');
    }
    return ctx;
};

export default usePostBattleTooltip;