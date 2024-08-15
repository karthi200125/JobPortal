import { NavIconSkeleton, PremiumSkeleton, SearchSkeleton, UserProfileSkeleton } from '@/Skeletons/NavbarSkeletons';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Logo from '../Logo';

const Premium = dynamic(() => import('./Premiem'), { suspense: true });
const NavIcons = dynamic(() => import('./NavIcons'), { suspense: true });
const Search = dynamic(() => import('../Search'), { suspense: true });
const UserProfileCard = dynamic(() => import('./UserProfileCard'), { suspense: true });

const Navbar = () => {
    return (
        <nav className=" w-full h-[55px] border-b flex flex-row items-center justify-between">
            <Logo />
            <Suspense fallback={<SearchSkeleton />}>
                <Search />
            </Suspense>
            <div className="hidden sm:flex flex-row items-center gap-5 xl:gap-10">
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
