"use client";
import { PiClockCounterClockwiseBold } from 'react-icons/pi'
import { MdTrendingUp } from 'react-icons/md'

const LpLeadingCompanies = () => {
    const features = [
        {
            title: "FLEXIBILITY",
            description: "Explore 2,000+ companies offering remote and hybrid work options for a better work-life balance.",
            icon: <PiClockCounterClockwiseBold size={30} />
        },
        {
            title: "CAREER GROWTH",
            description: "Find companies that invest in employee development, training, and career progression.",
            icon: <MdTrendingUp size={30} />
        },
    ];

    return (
        <section className="w-full py-10 md:py-20 space-y-10 md:space-y-20">
            <div className="w-full mx-auto space-y-10 md:space-y-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <h1 className="flex-1">Helping Land Your Dream Job</h1>
                    <p className="flex-1 text-white/40 md:text-start text-center w-full">
                        Explore countless opportunities with top companies worldwide.
                        We connect you with the best career options tailored to your skills and ambitions.
                    </p>
                </div>

                {/* Features Section */}
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex-1 p-5 md:p-10 space-y-5 bg-white/5 rounded-[30px] max-h-max"
                        >
                            <div className="w-[60px] h-[60px] bg-black rounded-full flexcenter">
                                {feature?.icon}
                            </div>
                            <h4 className="text-lg font-semibold">{feature.title}</h4>
                            <h3 className="text-md text-white/40">{feature.description}</h3>
                            <div className="flex flex-row items-center gap-5">
                                <span className="w-[20%] h-[1px] bg-white text-neutral-500"></span>
                                <h6 className="text-neutral-500 cursor-pointer hover:underline">Learn More</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LpLeadingCompanies;
