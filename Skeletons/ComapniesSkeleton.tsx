import { Skeleton } from "@/components/ui/skeleton";

const CompaniesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="bg-neutral-200 h-[120px] rounded-[10px]" />
            ))}
        </div>
    );
};

export default CompaniesSkeleton;
