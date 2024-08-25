'use client';

import { logoutRedux } from "@/app/Redux/AuthSlice";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { profileCardItems } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const UserProfileCard = () => {
    const user = useSelector((state: any) => state.user.user)
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = (item: any) => {
        if (item?.title === "Sign Out") {
            dispatch(logoutRedux())
            router.push(item.href);
        } else {
            router.push(item.href);
        }
    };

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <button onClick={() => router.push('/userprofile')}>
                    <Image
                        src="https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?uid=R35344889&ga=GA1.1.1654768561.1721831904&semt=ais_hybrid"
                        alt="User profile"
                        className="w-[30px] h-[30px] rounded-full bg-white/10 cursor-pointer object-cover"
                        width={30}
                        height={30}
                    />
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="space-y-3 min-w-[250px]">
                <div className="flex flex-row items-start gap-5 border-b pb-3">
                    <Image
                        src="https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?uid=R35344889&ga=GA1.1.1654768561.1721831904&semt=ais_hybrid"
                        alt="User profile"
                        className="w-[60px] h-[60px] rounded-full bg-white/10 cursor-pointer object-cover"
                        width={60}
                        height={60}
                    />
                    <div className="w-[170px]">
                        <h4 className="capitalize font-bold">{user?.username}</h4>
                        <h4>{user?.email}</h4>
                        <h6 className="line-clamp-3 text-[var(--lighttext)]">{user?.userBio}</h6>
                    </div>
                </div>
                <div>
                    {profileCardItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-row items-center gap-5 w-full p-3 rounded-md hover:bg-neutral-100 cursor-pointer transition"
                            onClick={() => handleClick(item)}
                        >
                            {item.icon}
                            <h4>{item.title}</h4>
                        </div>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default UserProfileCard;
