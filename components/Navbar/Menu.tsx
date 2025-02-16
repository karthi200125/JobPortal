'use client'

import { logoutRedux } from "@/app/Redux/AuthSlice";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaCrown, FaSuitcase } from "react-icons/fa";
import { RiMenu3Line, RiMessage3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../Icon";
import noAvatar from '../../public/noProfile.webp'
import { IoPersonOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { signOut } from "next-auth/react";

const Menu = () => {

    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname()
    const basePath = pathname.split('/').slice(0, 2).join('/');

    const profileCardItems = [
        {
            id: 1,
            title: "Profile",
            icon: <IoPersonOutline size={20} />,
            href: `/userProfile/${user?.id}`
        },
        {
            id: 2,
            title: "Jobs",
            icon: <FaSuitcase size={20} />,
            href: "/jobs"
        },
        {
            id: 3,
            title: "Companies",
            icon: <BsFillBuildingsFill size={20} />,
            href: "/companies"
        },
        {
            id: 4,
            title: "Messages",
            icon: <RiMessage3Fill size={20} />,
            href: "/messages"
        },
        {
            id: 5,
            title: "Dashboard",
            icon: <MdDashboard size={20} />,
            href: "/dashboard"
        },
        {
            id: 6,
            title: "Sign Out",
            icon: <PiSignOutBold size={20} />,
            href: "/"
        },
    ];

    const handleClick = useCallback((item: any) => {
        if (item?.title === "Sign Out") {
            dispatch(logoutRedux());
            localStorage.removeItem('role')
            signOut()            
            router.push(item.href);
        } else {
            router.push(item.href);
        }
    }, [dispatch, router]);



    return (
        <div className='md:hidden w-[40px] h-[40px] rounded-md bg-white/10 flexcenter text-white'>
            <Sheet >
                <SheetTrigger>
                    <RiMenu3Line size={25} />
                </SheetTrigger>
                <SheetContent className="w-[90%] h-screen space-y-5">
                    {/*  profile detals*/}
                    <div className="flex flex-row items-start gap-3">
                        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                            <Image src={user?.userImage || noAvatar.src} alt="" fill className="rounded-full bg-neutral-200 w-full h-full object-cover absolute top-0 left-0" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="capitalize font-bold">{user?.username}</h4>
                            <h4 className="text-xs text-neutral-400">{user?.email}</h4>
                        </div>
                    </div>

                    <div className='text-black pro w-full px-5 rounded-md h-[50px] flex flex-row items-center gap-3 cursor-pointer'>
                        <Icon icon={<FaCrown size={20} />} title="Upgrade Premium" />
                        <h5 className='font-bold'>Premium</h5>
                    </div>

                    {/* nav routes */}
                    <div className="space-y-1">
                        {profileCardItems.map((item) => (
                            <div
                                key={item.id}
                                className={`${item?.href === basePath && "bg-neutral-100"} flex flex-row items-center gap-5 w-full p-3 rounded-md hover:bg-neutral-100 cursor-pointer transition`}
                                onClick={() => handleClick(item)}
                            >
                                <div className="w-[50px] h-[50px] flex items-center justify-center bg-neutral-100 rounded-md">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl">{item.title}</h4>
                            </div>
                        ))}
                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Menu