import Button from "@/components/Button"

const LandingPage = () => {
    return (
        <div className="w-full flexcenter h-[85vh] bg-white/[0.05] rounded-[30px]">
            <div className="flexcenter flex-col gap-5 text-center">
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