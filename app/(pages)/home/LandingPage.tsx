import Button from "@/components/Button"
import Image from "next/image"

const LandingPage = () => {
    return (
        <div className="relative w-full flexcenter h-[85vh] bg-white/[0.05] rounded-[30px] overflow-hidden">
            <Image
                src={''}
                alt=""
                width={100}
                height={100}
                className="w-full h-full absolute top-0 left-0 filter brightness-50"
            />
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