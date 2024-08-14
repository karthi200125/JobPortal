import React from 'react'
import { FaHome } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";


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
    ]

    return (
        <div className='flex flex-xrow items-center gap-5 xl:gap-10'>
            {NavIcons.map((icon) => (
                <div key={icon.id} className='relative cursor-pointer text-neutral-400 hover:text-black trans'>
                    {icon.icon}
                    {/* {icon.isCount === true &&
                        <div className='absolute w-[20px] h-[20px] bg-red-600 rounded-full flex items-center justify-center top-[-10px] right-[-10px] text-white text-xs'>
                            {icon.count}
                        </div>
                    } */}
                </div>
            ))}
        </div>
    )
}

export default NavIcons