"use client";

import { getNetworkusers } from "@/actions/user/getNetworkusers";
import Title from "@/lib/MetaTitle";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import NetworkUser from "./NetworkUser";

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
                        users?.map((user: User) => <NetworkUser key={user.id} networkUser={user} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default NetWork;


