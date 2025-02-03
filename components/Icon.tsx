'use client'

import React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

interface IconProps {
    icon?: any;
    href?: string;
    className?: string;
    count?: string;
    title?: string;
    tooltipbg?: string;
    isHover?: boolean;
    onClick?: any;
}

const Icon = ({ icon, className, count, title, tooltipbg, isHover, href, onClick }: IconProps) => {

    const router = useRouter()

    const HandleClick = () => {
        if (href) {
            router.push(href)
        }
        return;
    }

    return (
        <TooltipProvider >
            <Tooltip >
                <TooltipTrigger asChild onClick={onClick}>
                    <div
                        className={`${className} ${isHover && "hover:bg-neutral-100 w-[40px] h-[40px]"} relative cursor-pointer trans rounded-[10px] flexcenter`}
                        onClick={HandleClick}
                    >
                        {icon}
                        {count &&
                            <div className='absolute w-[20px] h-[20px] bg-red-500 rounded-full flex items-center justify-center top-[-10px] right-[-10px] text-white text-[10px]'>
                                {count}
                            </div>
                        }
                    </div>
                </TooltipTrigger>
                <TooltipContent className={`${tooltipbg !== 'white' ? "bg-black text-white" : "bg-white text-black border"} text-xs px-3 rounded-[5px] py-2`}>
                    <p className='font-bold'>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default Icon