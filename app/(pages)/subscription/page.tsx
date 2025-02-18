'use client'

import { CheckOutSession } from "@/actions/stripe";
import Button from "@/components/Button";
import { subscriptionPlans } from "@/data";
import { useTransition } from "react";
import { FaCrown } from "react-icons/fa";
import { PiArrowCircleRightFill } from "react-icons/pi";
import { useSelector } from "react-redux";

export default function Subscription() {
    const user = useSelector((state: any) => state.user.user);
    const [isLoading, startTransition] = useTransition()    

    let selectedTab: "candidates" | "recruiters" | "organizations" | null = null;
    if (user?.role === "RECRUITER") selectedTab = "recruiters";
    else if (user?.role === "CANDIDATE") selectedTab = "candidates";
    else if (user?.role === "ORGANIZATION") selectedTab = "organizations";

    if (!selectedTab) return <p className="text-center">No subscription plans available.</p>;

    const handleSubscription = (plan: any) => {
        startTransition(async () => {
            try {
                const response: any = await CheckOutSession({ user, plan });
                if (response?.sessionUrl) {
                    window.location.href = response.sessionUrl;
                }
            } catch (error) {
                console.error("Error during checkout session creation:", error);
            }
        });
    };

    return (
        <div className="w-full flex flex-col gap-5 items-center justify-center min-h-screen py-10">
            <h1>Our Pricing Plans</h1>

            {user?.isPro ?
                <div>See You plan</div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subscriptionPlans[selectedTab]?.map((plan, index) => (
                        <div
                            key={index}
                            className={`w-full max-h-max rounded-[30px] p-5 lg:p-10 bg-white space-y-10 text-black border shadow-lg ${index === 1 ? 'mt-0 md:mt-10' : ''}`}
                        >
                            <div className="flex flex-row items-center gap-5">
                                <div className="w-[80px] h-[80px] rounded-full bg-neutral-200 flex items-center justify-center text-black">
                                    <FaCrown size={30} className="text-[var(--pro)]" />
                                </div>
                                <h2>{plan?.name}</h2>
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                {plan?.features?.map((feature, idx) => (
                                    <div key={idx} className="flex flex-row items-center gap-3">
                                        <PiArrowCircleRightFill size={20} className="text-green-600" />
                                        <h3 className="font-semibold">{feature}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-end gap-1 w-full justify-center">
                                <h1>₹{plan?.price}</h1>
                                <h5 className="text-neutral-600">/{plan?.type}</h5>
                            </div>

                            {plan?.type !== "Free" && (
                                <Button onClick={() => handleSubscription(plan)} className="w-full pro" isLoading={isLoading}>
                                    Subscribe
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            }
            
        </div>
    );
}
