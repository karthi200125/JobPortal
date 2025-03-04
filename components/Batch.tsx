'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MdVerified } from "react-icons/md";
import { PiCrownFill, PiMedalFill } from 'react-icons/pi';

interface BatchProps {
    type?: 'premium' | 'RECRUITER' | 'CANDIDATE' | 'ORGANIZATION';
}

const Batch = ({ type }: BatchProps) => {
    let icon;
    let clr;
    let title;

    switch (type) {
        case 'premium':
            icon = <PiCrownFill size={22} className="text-yellow-300" />;
            clr = "pro";
            title = "Premium Member"
            break;
        case 'RECRUITER':
            icon = <PiMedalFill size={25} className="text-green-400" />;
            clr = "bg-green-400";
            title = "recruiter"
            break;
        case 'CANDIDATE':
            icon = <PiMedalFill size={25} className="text-blue-400" />;
            clr = "bg-blue-400";
            title = "candidate"
            break;
        case 'ORGANIZATION':
            icon = <MdVerified size={25} className="text-blue-500" />;
            clr = "bg-blue-400";
            title = "verified"
            break;
        default:
            icon = null;
            clr = "";
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`flexcenter cursor-pointer`}>
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
