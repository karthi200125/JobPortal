"use client";

import { logoutRedux } from "@/app/Redux/AuthSlice";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { RiMenu3Line, RiMessage3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from '../../public/noProfile.webp';
import Icon from "../Icon";
import { useProfileCardItems } from "./UserProfileCard";

const Menu = () => {
    const user = useSelector((state: any) => state.user?.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const ExtraItems = [
        {
            id: 9,
            title: "Companies",
            icon: <BsFillBuildingsFill size={20} />,
            href: "/companies",
            isCard: true
        },
        {
            id: 10,
            title: "Messages",
            icon: <RiMessage3Fill size={20} />,
            href: "/messages",
            isCard: true
        },
    ];

    const profileCardItems = useProfileCardItems(user) || [];
    const menuItems = [...ExtraItems, ...profileCardItems].filter(Boolean);

    const basePath = useMemo(() =>
        pathname.startsWith('/userProfile')
            ? pathname.split('/').slice(0, 3).join('/')
            : pathname.split('/').slice(0, 2).join('/'),
        [pathname]);

    const handleClick = useCallback((item: any) => {
        setOpen(false);
        if (item?.title === "Sign Out") {
            dispatch(logoutRedux());
            localStorage.removeItem('role');
            signOut();
            router.push(item.href);
        } else {
            router.push(item.href);
        }
    }, [dispatch, router]);

    const renderedItems = useMemo(() => {
        return menuItems.map((item) => (
            item.isCard && (
                <div
                    key={item.id}
                    className={`
                            ${basePath === item.href ? 'bg-neutral-100' : ''}
                            flex flex-row items-center gap-5 w-full p-3 rounded-md hover:bg-neutral-100 cursor-pointer transition
                        `}
                    onClick={() => handleClick(item)}
                >
                    {item.icon}
                    <h4>{item.title}</h4>
                </div>
            )
        ));
    }, [handleClick, basePath, profileCardItems]);


    return (
        <div className='md:hidden w-[40px] h-[40px] rounded-md bg-white/10 flexcenter text-white'>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger onClick={() => setOpen(true)}>
                    <RiMenu3Line size={25} />
                </SheetTrigger>
                <SheetContent className="w-[90%] h-screen space-y-5">

                    {/* Profile Details */}
                    <div className="flex flex-row items-start gap-3">
                        <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                            <Image
                                src={user?.userImage || noAvatar.src}
                                alt="User Profile"
                                fill
                                className="rounded-full bg-neutral-200 w-full h-full object-cover absolute top-0 left-0"
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="capitalize font-bold">{user?.username}</h4>
                            <h4 className="text-xs text-neutral-400">{user?.email}</h4>
                        </div>
                    </div>

                    {/* Premium Upgrade Section */}
                    {user?.isPro ? (
                        <div
                            onClick={() => {
                                setOpen(false);
                                router.push('/subscription');
                            }}
                            className="underline protext text-sm cursor-pointer trans hover:opacity-50"
                        >
                            Premium features
                        </div>
                    ) : (
                        <div
                            className='text-black pro w-full px-5 rounded-md h-[50px] flex flex-row items-center gap-3 cursor-pointer'
                            onClick={() => {
                                setOpen(false);
                                router.push('/subscription');
                            }}
                        >
                            <Icon icon={<FaCrown size={20} />} title="Upgrade Premium" />
                            <h5 className='font-bold'>Premium</h5>
                        </div>
                    )}

                    {/* Navigation Routes */}
                    <div className="space-y-1">
                        {renderedItems}
                    </div>

                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Menu;
