'use client'

import { logoutRedux } from "@/app/Redux/AuthSlice";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { profileCardItems } from "@/data";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaCrown } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../Icon";
import noAvatar from '../../public/noProfile.webp'

const Menu = () => {

    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname()
    const basePath = pathname.split('/').slice(0, 2).join('/');

    const handleClick = useCallback((item: any) => {
        if (item?.title === "Sign Out") {
            dispatch(logoutRedux());
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
                        <Image src={'' || noAvatar.src} alt="" className="w-[60px] h-[60px] rounded-full bg-neutral-200" />
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