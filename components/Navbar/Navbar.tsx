'use client'

import { NavIconSkeleton, PremiumSkeleton, UserProfileSkeleton } from '@/Skeletons/NavbarSkeletons';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../Logo';
import Menu from './Menu';

const Premium = dynamic(() => import('./Premiem'), { suspense: true });
const NavIcons = dynamic(() => import('./NavIcons'), { suspense: true });
const Search = dynamic(() => import('../Search/Search'), { suspense: true });
const UserProfileCard = dynamic(() => import('./UserProfileCard'), { suspense: true });

const Navbar = () => {

    const user = true

    return (
        <div className={`rounded-none md:rounded-[10px] bg-black relative top-1 max-h-max`}>
            <nav
                className={`${user ? `sticky top-0 md:top-1 left-0 bg-black px-2 md:px-5 z-10 w-full h-[55px] flex flex-row items-center justify-between` : "hidden"}`}
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
            >
                <Logo />

                <Search />

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
        </div>
    );
};

export default Navbar;
