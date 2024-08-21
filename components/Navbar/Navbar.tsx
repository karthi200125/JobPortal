import { NavIconSkeleton, PremiumSkeleton, SearchSkeleton, UserProfileSkeleton } from '@/Skeletons/NavbarSkeletons';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Logo from '../Logo';

const Premium = dynamic(() => import('./Premiem'), { suspense: true });
const NavIcons = dynamic(() => import('./NavIcons'), { suspense: true });
const Search = dynamic(() => import('../Search'), { suspense: true });
const UserProfileCard = dynamic(() => import('./UserProfileCard'), { suspense: true });

const Navbar = () => {

    const user = true

    return (
        <nav className={`${user ? 'sticky top-1 rounded-[10px] left-0 bg-black px-5 z-10 w-full h-[55px] border-b flex flex-row items-center justify-between' : "hidden"}`}>
            <Logo />
            <Suspense fallback={<SearchSkeleton />}>
                <Search />
            </Suspense>
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
        </nav>
    );
};

export default Navbar;
