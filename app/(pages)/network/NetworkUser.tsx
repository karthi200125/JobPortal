"use client";

import { UserFollowAction } from "@/actions/user/UserFollowAction";
import { userFollow } from "@/app/Redux/AuthSlice";
import Button from "@/components/Button";
import noProfile from '@/public/noProfile.webp';
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

interface NetworkUserProps {
    networkUser: any;
}


const NetworkUser = ({ networkUser }: NetworkUserProps) => {
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

export default NetworkUser