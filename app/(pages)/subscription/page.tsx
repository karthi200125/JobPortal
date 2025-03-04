'use client';

import { getUserById } from "@/actions/auth/getUserById";
import { CheckOutSession } from "@/actions/stripe";
import { loginRedux } from "@/app/Redux/AuthSlice";
import Button from "@/components/Button";
import SubscriptionCard from "@/components/SubscriptionCard";
import { subscriptionPlans } from "@/data";
import Title from "@/lib/MetaTitle";
import { useEffect, useState } from "react";
import { FaCheck, FaCrown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function Subscription() {
    const user = useSelector((state: any) => state.user.user);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserData = async () => {
            const updatedUser = await getUserById(user?.id)
            dispatch(loginRedux(updatedUser))
        };
        fetchUserData();
    }, [dispatch, user?.id]);


    let selectedTab: "CANDIDATE" | "RECRUITER" | "ORGANIZATION" | null = null;
    if (user?.role === "RECRUITER") selectedTab = "RECRUITER";
    else if (user?.role === "CANDIDATE") selectedTab = "CANDIDATE";
    else if (user?.role === "ORGANIZATION") selectedTab = "ORGANIZATION";

    if (!selectedTab) return <p className="w-full flexcenter messageh">No subscription plans available.</p>;

    const handleSubscription = async (plan: any, index: number) => {
        setLoadingIndex(index);

        try {
            const response: any = await CheckOutSession({
                user,
                plan: { ...plan, icon: undefined },
            });

            if (response?.sessionUrl) {
                window.location.href = response.sessionUrl;
            }
        } catch (error) {
            console.error("Error during checkout session creation:", error);
        } finally {
            setLoadingIndex(null);
        }
    };

    return (
        <div className="w-full flex flex-col gap-5 items-center justify-center min-h-screen py-10">
            <Title
                title={`${user?.isPro ? "Manage Your Subscription" : "Upgrade Pro"} | JOBIFY`}
                description="Unlock exclusive job listings, premium features, and career insights with JOBIFY's subscription plans."
                keywords="subscription, premium jobs, job search upgrade, career boost"
            />

            {!user?.isPro && <h1>Our Pricing Plans</h1>}

            {!user?.isPro ? (
                <SubscriptionCard />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subscriptionPlans[selectedTab]?.map((plan, index) => (
                        <div
                            key={index}
                            className={`w-full max-h-max rounded-[30px] p-5 lg:p-10 bg-white space-y-10 text-black border shadow-lg ${index === 1 ? 'mt-0 md:mt-10' : ''
                                }`}
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
                                    <div key={idx} className="flex flex-row items-center gap-5">
                                        <FaCheck size={20} className="text-green-600" />
                                        <h3 className="text-neutral-400">{feature}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-end gap-1 w-full justify-center">
                                <h1>₹{plan?.price}</h1>
                                <h5 className="text-neutral-600">/{plan?.type}</h5>
                            </div>

                            {plan?.type !== "Free" && (
                                <Button
                                    onClick={() => handleSubscription(plan, index)}
                                    className="w-full pro"
                                    isLoading={loadingIndex === index}
                                >
                                    Subscribe
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
