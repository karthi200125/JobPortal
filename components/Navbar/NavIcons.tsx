'use client'

import { usePathname } from 'next/navigation';
import { FaHome, FaSuitcase } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import Icon from '../Icon';
import { BsFillBuildingsFill } from "react-icons/bs";

const NavIcons = () => {

    const NavIcons = [
        {
            id: 1,
            icon: <FaHome size={20} />,
            count: 0,
            isCount: false,
            title: "Home",
            href: "/"
        },
        {
            id: 2,
            icon: <RiMessage3Fill size={20} />,
            count: 5,
            isCount: true,
            title: "Message",
            href: "/messages"
        },
        {
            id: 3,
            icon: <BsFillBuildingsFill size={20} />,
            count: 0,
            isCount: true,
            title: "Companies",
            href: "/companies"
        },
        {
            id: 4,
            icon: <FaSuitcase size={20} />,
            count: 0,
            isCount: true,
            title: "Jobs",
            href: "/jobs"
        },
        {
            id: 5,
            icon: <MdDashboard size={20} />,
            count: 0,
            isCount: true,
            title: "Dashboard",
            href: "/dashboard"
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
                    count={icon?.count}
                    tooltipbg='white'
                    className={`${pathname === icon?.href && "!bg-white/10 !text-white"} hover:!bg-white/10 hover:!text-white !text-neutral-600`} />
            ))}
        </div>
    )
}

export default NavIcons