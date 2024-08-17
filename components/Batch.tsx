import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { PiCrownFill, PiMedalFill } from 'react-icons/pi';

interface BatchProps {
    type?: 'premium' | 'recruiter' | 'candidate';
}

const Batch = ({ type }: BatchProps) => {
    let icon;
    let clr;
    let title;

    switch (type) {
        case 'premium':
            icon = <PiCrownFill size={15} />;
            clr = "bg-neutral-200";
            title = "premium"
            break;
        case 'recruiter':
            icon = <PiMedalFill size={15} />;
            clr = "bg-green-400";
            title = "recruiter"
            break;
        case 'candidate':
            icon = <PiMedalFill size={15} />;
            clr = "bg-blue-400";
            title = "candidate"
            break;
        default:
            icon = null;
            clr = "";
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`w-[25px] h-[20px] rounded-[5px] flexcenter ${clr} cursor-pointer`}>
                        {icon}
                    </div>
                </TooltipTrigger>
                <TooltipContent className='bg-black text-white text-xs px-3 rounded-[5px] py-2'>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Batch;
