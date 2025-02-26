"use client";

import { getNetworkusers } from "@/actions/user/getNetworkusers";
import Button from "@/components/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import noProfile from '@/public/noProfile.webp';
import { UserFollowAction } from "@/actions/user/UserFollowAction";
import { userFollow } from "@/app/Redux/AuthSlice";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import Title from "@/lib/MetaTitle";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";

interface User {
    id: number;
    username: string;
    userImage?: string;
    profession?: string;
}

const NetWork = () => {
    const user = useSelector((state: any) => state.user?.user);
    const [network, setNetwork] = useState<"followers" | "followings">("followers");

    const ids = useMemo(() => (network === "followers" ? user?.followers || [] : user?.followings || []), [network, user]);

    const { data: users, isPending } = useQuery({
        queryKey: ["getNetworkUsers", ids],
        queryFn: async () => await getNetworkusers(ids),
        enabled: ids.length > 0,
    });

    return (
        <div className="w-full max-h-max pt-5">
            <Title
                title="Your Professional Network | JOBIFY"
                description="Connect with professionals, follow recruiters, and build your career network on JOBIFY."
                keywords="network, job connections, follow recruiters, career networking, professional network"
            />

            <div className="rounded-[20px] border">
                {/* Tabs */}
                <div className="flex items-center gap-5 px-5 border-b border-neutral-200">
                    {["followers", "followings"].map((type) => (
                        <h3
                            key={type}
                            onClick={() => setNetwork(type as "followers" | "followings")}
                            className={`capitalize max-w-max cursor-pointer transition hover:opacity-50 py-5 border-b-[3px] border-solid ${network === type ? "border-[var(--voilet)] text-[var(--voilet)]" : "border-transparent text-black"
                                }`}
                        >
                            {type}
                        </h3>
                    ))}
                </div>

                <h4 className="text-neutral-500 p-3">
                    {network !== "followers" ? `You are following ${users?.length || 0} people out of your network` : `${users?.length || 0} people are following you`}
                </h4>

                {/* Users */}
                <div className="max-h-max p-5 space-y-3">
                    {isPending ? (
                        <EmployeesSkeleton />
                    ) : users?.length === 0 ? (
                        <div>No users found</div>
                    ) : (
                        users?.map((user: User) => <NetworkUser key={user.id} networkUser={user} network={network} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default NetWork;

interface NetworkUserProps {
    networkUser: User;
    network: string;
}

const NetworkUser = ({ networkUser, network }: NetworkUserProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();

    const isFollowings = user?.followings?.includes(networkUser?.id);

    const handleFollow = async () => {
        if (!user?.id || !networkUser.id) return;

        startTransition(() => {
            UserFollowAction(user.id, networkUser.id).then((data: any) => {
                if (data?.success) {
                    dispatch(userFollow(networkUser?.id));
                    queryClient.invalidateQueries({ queryKey: ["getNetworkUsers", user?.id] });
                } else if (data?.error) {
                    console.error(data.error);
                }
            });
        });
    };

    return (
        <div className="py-2 md:p-2 border-b flex items-center justify-between">
            <div className="md:max-w-max flex items-center gap-3">
                <div className="relative w-[40px] md:w-[60px] h-[40px] md:h-[60px] overflow-hidden rounded-full">
                    <Image src={networkUser?.userImage || noProfile.src} fill alt={networkUser.username} className="object-cover w-full h-full absolute top-0 left-0" />
                </div>
                <div>
                    <Link href={`/userProfile/${networkUser?.id}`} className="font-semibold text-sm md:text-lg cursor-pointer trans hover:opacity-50">{networkUser?.username}</Link>
                    <h4 className="hidden md:block text-neutral-600 line-clamp-1">{networkUser?.profession}</h4>
                </div>
            </div>
            <Button
                variant="border"
                isLoading={isPending}
                className={isFollowings ? "!bg-[var(--voilet)] text-white" : "!text-black"}
                onClick={handleFollow}
                icon={isFollowings && <GoPlus size={20} />}
            >
                {isFollowings ? "Following" : "Follow"}
            </Button>
        </div>
    );
};
