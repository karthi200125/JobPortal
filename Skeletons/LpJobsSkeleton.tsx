import { Skeleton } from "@/components/ui/skeleton"

const LpJobsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="bg-white/[0.05] p-5 rounded-xl overflow-hidden space-y-5">

                    <div className="space-y-3">
                        <Skeleton className="w-[100px] h-[100px] rounded-lg bg-black" />
                        <Skeleton className="w-full h-5 bg-white/[0.05]" />
                        <Skeleton className="w-[60%] h-3 bg-white/[0.05]" />
                    </div>

                    <div className="space-y-1">
                        <Skeleton className="w-full h-3 bg-white/[0.05]" />
                        <Skeleton className="w-full h-3 bg-white/[0.05]" />
                        <Skeleton className="w-full h-3 bg-white/[0.05]" />
                    </div>

                    <div className="flex flex-row items-center gap-2 overflow-x-hidden">
                        <Skeleton className="rounded-full h-[40px] w-[100px] bg-black" />
                        <Skeleton className="rounded-full h-[40px] w-[100px] bg-black" />
                        <Skeleton className="rounded-full h-[40px] w-[100px] bg-black" />
                    </div>

                </Skeleton>
            ))}
        </ div>
    )
}

export default LpJobsSkeleton