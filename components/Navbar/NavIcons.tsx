'use client'

import React from 'react'
import { FaHome } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '../Icon';

const NavIcons = () => {

    const NavIcons = [
        {
            id: 1,
            icon: <FaHome size={25} />,
            count: '',
            isCount: false,
            title: "Home",
            href: "/"
        },
        {
            id: 2,
            icon: <RiMessage3Fill size={25} />,
            count: 5,
            isCount: true,
            title: "Message",
            href: "/messages"
        },
        {
            id: 3,
            icon: <IoNotifications size={25} />,
            count: 5,
            isCount: true,
            title: "Notifications",
            href: "/notifications"
        },
        {
            id: 4,
            icon: <FaHome size={25} />,
            count: 10,
            isCount: true,
            title: "Job Status",
            href: "/status"
        },
        {
            id: 5,
            icon: <FaHome size={25} />,
            count: 10,
            isCount: true,
            title: "Job Status",
            href: "/jobs"
        },
    ]

    const pathname = usePathname()


    return (
        <div className='flex flex-xrow items-center gap-5'>
            {NavIcons.map((icon) => (
                <Icon
                    key={icon?.id}
                    href={icon?.href}
                    icon={icon?.icon}
                    title={icon?.title}
                    isHover
                    className={`${pathname === icon?.href && "!bg-white/10 !text-white"} hover:!bg-white/10 hover:!text-white !text-neutral-600`} />
            ))}
        </div>
    )
}

export default NavIcons