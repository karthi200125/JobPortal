'use client'

import Button from "@/components/Button"
import Image from "next/image"
import mainImage from '../../../public/main.svg'

const LandingPage = () => {
    return (
        <div className="relative w-full flexcenter h-[85vh] ">
            {/* <img
                src={mainImage.src}
                alt="Main Image"
                className="w-full h-full absolute top-0 left-0 object-center"
            /> */}
            <div className="flexcenter flex-col gap-5 text-center z-10">
                <h3 className="text-white/40">Trusted by 1000+ compnaies</h3>
                <h1 className="text-7xl font-bold">Find your dream job</h1>
                <h1 className="text-7xl font-bold">Easy and fast</h1>
                <h5 className="text-white/40">A platfomr wher you can get job and updates about ypur carrier growth withut any hassels</h5>
                <Button>Get Started</Button>
            </div>
        </div>
    )
}

export default LandingPage