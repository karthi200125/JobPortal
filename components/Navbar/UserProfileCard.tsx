'use client';

import { logoutRedux } from "@/app/Redux/AuthSlice";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import noProfile from '../../public/noProfile.webp';
import { memo, useCallback, useMemo } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaSuitcase, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { GoPlus } from "react-icons/go";
import { GrStatusCriticalSmall } from "react-icons/gr";

const UserProfileCard = () => {

    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const isOrg = user?.role === 'ORGANIZATION'
    const isRec = user?.role === 'RECRUITER'
    const isCan = user?.role === 'CANDIDATE'

    const profileCardItems = [
        {
            id: 1,
            title: "Profile",
            icon: <IoPersonOutline size={20} />,
            href: `/userProfile/${user?.id}`,
            isCard: true
        },
        {
            id: 2,
            title: "Jobs",
            icon: <FaSuitcase size={20} />,
            href: "/jobs",
            isCard: (isRec || isCan) ? true : false
        },
        {
            id: 3,
            title: "Dashboard",
            icon: <MdDashboard size={20} />,
            href: "/dashboard",
            isCard: true
        },
        {
            id: 4,
            title: "Create Job",
            icon: <GoPlus size={20} />,
            href: "/createJob",
            isCard: (isRec || isOrg) ? true : false
        },
        {
            id: 5,
            title: "Job Status",
            icon: <GrStatusCriticalSmall size={20} />,
            href: "/dashboard/jobStatus",
            isCard: (isRec || isCan) ? true : false
        },
        {
            id: 6,
            title: "Employees",
            icon: <FaUsers size={20} />,
            href: "/dashboard/employees",
            isCard: isOrg ? true : false
        },
        {
            id: 7,
            title: "Sign Out",
            icon: <PiSignOutBold size={20} />,
            href: "/",
            isCard: true
        },
    ];

    const pathname = usePathname()
    const basePath = pathname.startsWith('/userProfile') ? pathname.split('/').slice(0, 3).join('/') : pathname.split('/').slice(0, 2).join('/')

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

    const renderedItems = useMemo(() => {
        return profileCardItems.map((item) => (
            <div
                key={item.id}
                className={`
                    ${basePath === item.href && 'bg-neutral-100'}
                    ${item?.isCard === false && 'hidden'}
                    flex flex-row items-center gap-5 w-full p-3 rounded-md hover:bg-neutral-100 cursor-pointer transition
                    `}
                onClick={() => handleClick(item)}
            >
                {item.icon}
                <h4>{item.title}</h4>
            </div>
        ));
    }, [handleClick]);

    return (
        <HoverCard >
            <HoverCardTrigger asChild>
                <button onClick={() => router.push('/userprofile')}>
                    <div className="w-[35px] h-[35px] relative overflow-hidden rounded-full ">
                        <Image
                            src={user?.userImage || noProfile.src}
                            alt="User profile"
                            className="w-full h-full rounded-full bg-neutral-200 cursor-pointer object-cover absolute top-0 left-0"
                            fill
                        />
                    </div>
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="space-y-3 min-w-[250px] overflow-hidden">
                <div className="flex flex-row items-start gap-5 border-b pb-3">
                    <Image
                        src={user?.userImage || noProfile.src}
                        alt="User profile"
                        className="w-[60px] h-[60px] rounded-full bg-white/10 cursor-pointer object-cover"
                        width={60}
                        height={60}
                    />
                    <div className="w-[170px]">
                        <h4 className="capitalize font-bold line-clamp-1">{user?.username}</h4>
                        <h4 className="text-xs text-neutral-400 line-clamp-1">{user?.email}</h4>
                        <h4 className="text-xs">{user?.profession}</h4>
                        {/* <h6 className="line-clamp-3 text-[var(--lighttext)]">{user?.userBio}</h6> */}
                    </div>
                </div>
                <div>
                    {renderedItems}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default memo(UserProfileCard);
