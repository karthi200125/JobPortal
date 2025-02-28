"use client";

import { getSubscription } from "@/actions/getSubscription";
import Button from "@/components/Button";
import { subscriptionPlans } from "@/data";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { PiArrowCircleRightFill } from "react-icons/pi";
import { useSelector } from "react-redux";

type UserRole = "CANDIDATE" | "RECRUITER" | "ORGANIZATION";

interface Subscription {
    planName?: string;
    subscriptionStatus: string;
    stripeCurrentPeriodEnd?: string;
    amount?: string;
    billingInterval?: string;
    createdAt?: string;
}

const SubscriptionCard = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data, isPending, error } = useQuery<Subscription>({
        queryKey: ["getSubscription", user?.id],
        queryFn: async () => await getSubscription(user?.id),
        enabled: !!user?.id,
    });

    if (isPending) {
        return <h5>Loading...</h5>;
    }

    if (error || !data) {
        return <div className="text-red-500 font-semibold">Failed to load subscription details</div>;
    }

    const userRole = user?.role as UserRole;
    const getSubscriptionPlan = subscriptionPlans[userRole]?.find(
        (sp) => sp.name === data?.planName
    );

    return (
        <div className="w-full md:max-w-max mx-auto p-5 md:p-10 shadow-lg border rounded-lg space-y-5 md:space-y-10">

            <div className="space-y-2">
                <h3 className="font-bold">Subscription Plan</h3>
                <h5 className="text-neutral-500">You are currently on the {data?.planName} plan</h5>
                <Button className="!rounded-md">Manage Subscription</Button>
            </div>

            <span className="h-[1px] w-full bg-neutral-200"></span>

            <div className="flex flex-col md:flex-row items-start gap-10 justify-between">
                <div className="space-y-2">
                    <h3 className="text-sm flex gap-5 items-center">Plan:
                        <span className="p-2 rounded-md text-sm font-semibold pro">{data.planName || "N/A"}</span>
                    </h3>
                    <h3 className="text-sm flex gap-5 items-center">Status:
                        <span className={`p-2  rounded-md text-white text-sm ${data.subscriptionStatus === "active" ? "bg-green-500" : "bg-red-500"}`}>
                            {data.subscriptionStatus || "N/A"}
                        </span>
                    </h3>
                    <h3 className="text-sm flex gap-5 items-center">Plan Price:
                        <span className="text-sm font-semibold ">₹ {data.amount || "N/A"}</span>
                    </h3>
                    <h3 className="text-sm flex gap-5 items-center">Plan Type:
                        <span className="text-sm font-semibold">{data.billingInterval || "N/A"}</span>
                    </h3>
                    <h3 className="text-sm flex gap-5 items-center">Subscription Date:
                        <span className="text-sm font-semibold">{data.createdAt ? moment(data.createdAt).format("MMMM D, YYYY") : "N/A"}</span>
                    </h3>
                    <h3 className="text-sm flex gap-5 items-center">Expired Date:
                        <span className="text-sm font-semibold">{data.stripeCurrentPeriodEnd ? moment(data.stripeCurrentPeriodEnd).format("MMMM D, YYYY") : "N/A"}</span>
                    </h3>
                </div>

                <span className="w-full h-[1px] md:h-[100px] md:w-[1px] bg-neutral-200"></span>

                <div className="flex flex-col gap-2 items-start justify-start">
                    <h3 className="font-bold text-sm">Plan Features</h3>
                    <div className="space-y-3">
                        {getSubscriptionPlan?.features?.map((feature: any, index: number) => (
                            <div key={index} className="flex flex-row items-center gap-3">
                                <PiArrowCircleRightFill size={20} className="text-green-600" />
                                <h5 className="text-neutral-500">{feature}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SubscriptionCard;
