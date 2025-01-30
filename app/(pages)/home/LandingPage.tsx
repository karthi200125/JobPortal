'use client'

import Button from "@/components/Button"
import m1 from '../../../public/m1.png'

const LandingPage = () => {
    return (
        <div className="relative w-full flex flex-col gap-20 min-h-screen ">
            <div className="flexcenter flex-col gap-5 text-center z-10">
                <h3 className="text-white/40">Trusted by 1000+ compnaies</h3>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold">Find your dream job</h1>
                <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold">Easy and fast</h1>
                <h5 className="text-white/40">A platfomr wher you can get job and updates about ypur carrier growth withut any hassels</h5>
                <Button>Get Started</Button>
            </div>

            <div className="bg-white/10 rounded-[20px] w-full max-h-max overflow-hidden" style={{ borderTopRightRadius: '20px', borderTopLeftRadius: "20px" }}>
                <img src={m1.src} alt="" className="w-full h-full" />
            </div>
        </div>
    )
}

export default LandingPage