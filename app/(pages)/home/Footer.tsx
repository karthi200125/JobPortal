import { Button } from "@/components/ui/button"

const Footer = () => {
    return (
        <div className="w-full min-h-[50vh] bg-white/10">
            <div className="flex flex-row items-center gap-5 justify-between p-10 rounded-xl bg-[var(--voilet)]">
                <h2>Find Best Opurtunies Today</h2>
                <div className="flex flex-row items-center gap-5">
                    <Button>Explore Jobs</Button>
                    <Button>Start My Journy</Button>
                </div>
            </div>
        </div>
    )
}

export default Footer