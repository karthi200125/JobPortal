"use client";

import { getNetworkusers } from "@/actions/user/getNetworkusers";
import Title from "@/lib/MetaTitle";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import NetworkUser from "../NetworkUser";

interface User {
    id: number;
    username: string;
    userImage?: string;
    profession?: string;
}

const NetWork = () => {
    const params = useParams()
    const userId = Number(params?.userId)
    
    const user = useSelector((state: any) => state.user.user);
    const [network, setNetwork] = useState<"followers" | "followings">("followers");

    const { data: users, isPending } = useQuery({
        queryKey: ["getNetworkUsers", userId, network],
        queryFn: async () => await getNetworkusers(userId, network),
        enabled: !!userId,
    });

    const isCurrentUser = user?.id === userId;

    return (
        <div className="w-full max-h-max pt-5">
            <Title
                title={`${!isCurrentUser ? "User Professional Network" : "Your Professional Network"} | JOBIFY`}
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
                            className={`capitalize max-w-max cursor-pointer transition hover:opacity-50 py-5 border-b-[3px] border-solid 
                                ${network === type ? "border-[var(--voilet)] text-[var(--voilet)]" : "border-transparent text-black"}`}
                        >
                            {type}
                        </h3>
                    ))}
                </div>

                <h4 className="text-neutral-500 p-3">
                    {network !== "followers"
                        ? isCurrentUser
                            ? `You are following ${users?.length || 0} people out of your network`
                            : `That user followed ${users?.length || 0} people from their network`
                        : isCurrentUser
                            ? `${users?.length || 0} people are following you`
                            : `${users?.length || 0} people are following that user`}
                </h4>

                {/* Users */}
                <div className="max-h-max p-5 space-y-3">
                    {isPending ? (
                        <EmployeesSkeleton />
                    ) : users?.length === 0 ? (
                        <div>No users found</div>
                    ) : (
                        users?.map((networkUser: User) => (
                            <NetworkUser key={networkUser.id} networkUser={networkUser} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NetWork;
