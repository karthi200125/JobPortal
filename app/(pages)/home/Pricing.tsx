'use client'

import Button from "@/components/Button";
import { subscriptionPlans } from "@/data";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import { PiArrowCircleRightFill } from "react-icons/pi";

const Pricing = () => {

    const [selectedTab, setSelectedTab] = useState<"candidates" | "recruiters" | "organizations">("candidates");
    

    return (
        <div className="w-full max-h-max rounded-[30px] space-y-10 md:space-y-20  bg-white/[0.05] py-10 md:py-20 px-2">
            <div className="text-center w-full lg:w-[50%] mx-auto space-y-3 text-white">
                <h1>Our Pricing Plans</h1>
                <h4 className="text-white/20">Choose the plan that best fits your hiring needs. Whether you are a startup or a large enterprise, our plans are designed to help you find the right talent efficiently and effectively.</h4>
            </div>

            <div className="flex justify-center gap-2 mb-6 rounded-full overflow-hidden border max-w-max mx-auto p-1 bg-black text-white">
                {["candidates", "recruiters", "organizations"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab as "candidates" | "recruiters" | "organizations")}
                        className={`rounded-full capitalize px-2 sm:px-6 py-2 text-sm sm:text-lg transition ${selectedTab === tab && "bg-white text-black"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subscriptionPlans[selectedTab].map((plan, index) => (
                    <div key={index} className="w-full rounded-[30px] p-5 lg:p-10  bg-white space-y-10 text-black border shadow-lg">
                        <div className="flex flex-row items-center gap-5 ">
                            <div className="w-[100px] h-[100px] rounded-full bg-white/[0.05] flexcenter">
                                <FaCrown size={30} className="text-[var(--pro)]" />
                            </div>
                            <h2>{plan?.name}</h2>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            {plan?.features?.map((feature, index) => (
                                <div key={index} className="flex flex-row items-center gap-3">
                                    <PiArrowCircleRightFill size={20} className="text-green-600" />
                                    <h3 className="font-semibold">{feature}</h3>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-row items-end gap-1 w-full justify-center">
                            <h1>₹{plan?.price}</h1>
                            <h5 className="text-white/40">/${plan?.type}</h5>
                        </div>
                        <Button className='w-full pro'>Subscribe</Button>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Pricing;
