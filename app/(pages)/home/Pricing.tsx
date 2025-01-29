'use client'

import Button from "@/components/Button";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { PiArrowCircleRightFill } from "react-icons/pi";
import { FaCrown } from "react-icons/fa";

const Pricing = () => {

    const cards = [
        {
            id: 1,
            title: "Basic",
            price: "0",
            icon: <FaCrown size={30} className="text-[var(--pro)]" />,
            btn: "Get Started",
            features: [
                "5 job postings per month",
                "Access to resume database",
                "Basic candidate matching",
                "Email support",
            ]
        },
        {
            id: 2,
            title: "Premium",
            price: "1000",
            icon: <FaCrown size={30} className="text-[var(--pro)]" />,
            btn: "Upgrade Premium",
            features: [
                "Unlimited job postings",
                "Highlighted job listings",
                "Advanced candidate matching",
                "Dedicated account manager",
                "24/7 priority support",
                "Access to premium talent pool",
            ]
        },
    ]

    return (
        <div className="w-full max-h-max rounded-[30px] space-y-20 text-text bg-white/[0.05] py-20">
            <div className="text-center w-[50%] mx-auto space-y-3 text-white">
                <h1>Our Pricing Plans</h1>
                <h4 className="text-white/20">Choose the plan that best fits your hiring needs. Whether you are a startup or a large enterprise, our plans are designed to help you find the right talent efficiently and effectively.</h4>
            </div>

            <div className="max-w-max mx-auto flex flex-row items-start gap-20">
                {cards?.map((card) => (
                    <div key={card?.id} className="w-[400px] max-h-max rounded-[30px] p-10  bg-black space-y-10">
                        <div className="flex flex-row items-center gap-5 ">
                            <div className="w-[100px] h-[100px] rounded-full bg-white/[0.05] flexcenter">
                                {card?.icon}
                            </div>
                            <h1>{card?.title}</h1>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            {card?.features?.map((feature, index) => (
                                <div key={index} className="flex flex-row items-center gap-3">
                                    <PiArrowCircleRightFill size={20} className="text-green-600" />
                                    <h3 className="font-semibold">{feature}</h3>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-row items-end gap-1 w-full justify-center">
                            <h1>${card?.price}</h1>
                            <h5 className="text-white/40">/Month</h5>
                        </div>

                        {card?.title === 'Basic' ?
                            <Button className='w-full bg-white !text-black'>Get Started</Button>
                            :
                            <Button className='w-full pro'>Upgreade Premium</Button>
                        }

                    </div>
                ))}
            </div>
        </div >
    )
}

export default Pricing;
