'use client';

import { getUserById } from "@/actions/auth/getUserById";
import { CheckOutSession } from "@/actions/stripe";
import { loginRedux } from "@/app/Redux/AuthSlice";
import Button from "@/components/Button";
import SubscriptionCard from "@/components/SubscriptionCard";
import { subscriptionPlans } from "@/data";
import Title from "@/lib/MetaTitle";
import { useEffect, useTransition } from "react";
import { FaCrown } from "react-icons/fa";
import { PiArrowCircleRightFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function Subscription() {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const [isLoading, startTransition] = useTransition();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(user?.id);
                const data = await res.json();
                if (data) {
                    dispatch(loginRedux(data));
                }
            } catch (error) {
                console.error("Failed to fetch updated user data:", error);
            }
        };

        fetchUser();
    }, [dispatch]);

    let selectedTab: "CANDIDATE" | "RECRUITER" | "ORGANIZATION" | null = null;
    if (user?.role === "RECRUITER") selectedTab = "RECRUITER";
    else if (user?.role === "CANDIDATE") selectedTab = "CANDIDATE";
    else if (user?.role === "ORGANIZATION") selectedTab = "ORGANIZATION";

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
            <Title
                title={`${user?.isPro ? "Manage Your Subscription" : "Upgrade Pro"} | JOBIFY`}
                description="Unlock exclusive job listings, premium features, and career insights with JOBIFY's subscription plans."
                keywords="subscription, premium jobs, job search upgrade, career boost"
            />

            {!user?.isPro && <h1>Our Pricing Plans</h1>}

            {user?.isPro ? (
                <SubscriptionCard />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
            )}
        </div>
    );
}
