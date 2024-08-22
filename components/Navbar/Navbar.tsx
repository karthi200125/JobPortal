'use client'

import { NavIconSkeleton, PremiumSkeleton, SearchSkeleton, UserProfileSkeleton } from '@/Skeletons/NavbarSkeletons';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import Logo from '../Logo';
import Menu from './Menu';
import { IoSearchOutline } from "react-icons/io5";

const Premium = dynamic(() => import('./Premiem'), { suspense: true });
const NavIcons = dynamic(() => import('./NavIcons'), { suspense: true });
const Search = dynamic(() => import('../Search'), { suspense: true });
const UserProfileCard = dynamic(() => import('./UserProfileCard'), { suspense: true });

const Navbar = () => {

    const user = true

    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <div className={`rounded-[10px] bg-black relative top-1 max-h-max`}>
            <nav
                className={`${user ? `sticky top-1 ${!searchOpen && "rounded-[10px]"} left-0 bg-black px-2 md:px-5 z-10 w-full h-[55px] flex flex-row items-center justify-between` : "hidden"}`}
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
            >
                <Logo />

                {!searchOpen &&
                    <div className='relative w-[200px] md:w-[300px] h-[40px] bg-white/10 overflow-hidden rounded-full flex flex-row items-center gap-2 p-1' onClick={() => setSearchOpen(!searchOpen)}>
                        <input type="text" className='w-[90%] h-full pl-5 placeholder:text-white/40 bg-transparent text-xs' placeholder='search jobs here' />
                        <div className='w-[35px] h-[35px] rounded-full flexcenter bg-white cursor-pointer text-black'>
                            <IoSearchOutline size={20} />
                        </div>
                    </div>
                }

                <div className="hidden sm:flex flex-row items-center gap-5">
                    <Suspense fallback={<NavIconSkeleton />}>
                        <NavIcons />
                    </Suspense>
                    <Suspense fallback={<UserProfileSkeleton />}>
                        <UserProfileCard />
                    </Suspense>
                    <Suspense fallback={<PremiumSkeleton />}>
                        <Premium />
                    </Suspense>
                </div>
                <Menu />
            </nav>
            {searchOpen &&
                <div
                    className={`absolute top-[55px] left-0 w-full bg-black z-10 max-h-max md:h-[80px]`}
                    style={{ borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }}
                >
                    <Suspense fallback={<SearchSkeleton />}>
                        <Search onClose={(d: any) => setSearchOpen(d)} />
                    </Suspense>
                </div>
            }
        </div>
    );
};

export default Navbar;
