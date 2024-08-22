'use client'

import { Button } from '@/components/ui/button'


const LpLeadingCompanies = () => {
    return (
        <div className="w-full space-y-20">
            <div className="space-y-20 w-full mx-auto">
                <div className="flex flex-row items-center gap-5">
                    <h1 className="flex-1">We Help You Get Your Dream Job</h1>
                    <h5 className="flex-1 text-white/40">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, iusto numquam voluptates, aperiam eum consequuntur quia, laborum vero velit labore sunt odit sequi ullam ea quos. Recusandae quas unde reiciendis?</h5>
                </div>
                <div className="flex flex-row items-center gap-10">
                    <div className="flex-1 rounded-[30px] p-10 bg-white/[0.05] max-h-max space-y-5">
                        <div className="w-[60px] h-[60px] bg-black rounded-full"></div>
                        <h4>FLEXIBILITY</h4>
                        <h2>Discover the 2000 most flexible companies in the world</h2>
                        <div className="flex flex-row items-center gap-5">
                            <span className="w-[20%] h-[1px] bg-white"></span>
                            <h6>Learn More..</h6>
                        </div>
                    </div>
                    <div className="flex-1 rounded-[30px] p-10 bg-white/[0.05] max-h-max space-y-5">
                        <div className="w-[60px] h-[60px] bg-black rounded-full"></div>
                        <h4>FLEXIBILITY</h4>
                        <h2>Discover the 2000 most flexible companies in the world</h2>
                        <div className="flex flex-row items-center gap-5">
                            <span className="w-[20%] h-[1px] bg-white"></span>
                            <h6>Learn More..</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LpLeadingCompanies