import Link from "next/link";
import { LiaListSolid } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";

interface User {
    role?: "CANDIDATE" | "RECRUITER" | "ORGANIZATION";
    ProfileViews?: any[];
    postedJobs?: any[];
}

interface AppliedCountsProps {
    appliedJobs?: any[];
    user?: User;
}

const AppliedCounts = ({ appliedJobs, user }: AppliedCountsProps) => {
    const roleConfig = {
        CANDIDATE: {
            jobTitle2: "Applied Jobs",
            jobSubtitle2: "See the jobs you applied to",
            jobCount2: appliedJobs?.length || 0,
            jobTitle3: "Actions Taken",
            jobSubtitle3: "Review the jobs that took action",
            jobCount3: 0,
        },
        RECRUITER: {
            jobTitle2: "Applied Jobs",
            jobSubtitle2: "See the jobs you applied to",
            jobCount2: appliedJobs?.length || 0,
            jobTitle3: "Posted Jobs",
            jobSubtitle3: "See jobs that you posted",
            jobCount3: user?.postedJobs?.length || 0,
        },
        ORGANIZATION: {
            jobTitle2: "Posted Jobs",
            jobSubtitle2: "See jobs that you posted",
            jobCount2: user?.postedJobs?.length || 0,
            jobTitle3: "Actions Taken",
            jobSubtitle3: "Review the jobs that took action",
            jobCount3: 0,
        },
    } as const;

    const userRole = user?.role as keyof typeof roleConfig;
    const { jobTitle2, jobSubtitle2, jobCount2, jobTitle3, jobSubtitle3, jobCount3 } =
        roleConfig[userRole] || {
            jobTitle2: "",
            jobSubtitle2: "",
            jobCount2: 0,
            jobTitle3: "",
            jobSubtitle3: "",
            jobCount3: 0,
        };

    const Analysis = [
        {
            id: 1,
            icon: <LuUsers size={25} />,
            title: "Profile Views",
            count: user?.ProfileViews?.length || 0,
            subtitle: "Discover who viewed your profile",
            href: "/dashboard?profileViews",
        },
        {
            id: 2,
            icon: <LiaListSolid size={25} />,
            title: jobTitle2,
            count: jobCount2,
            subtitle: jobSubtitle2,
            href: "/dashboard?appliedJobs",
        },
        {
            id: 3,
            icon: <MdOutlinePendingActions size={25} />,
            title: jobTitle3,
            count: jobCount3,
            subtitle: jobSubtitle3,
            href: user?.role !== "CANDIDATE" ? "/dashboard?postedJobs" : "/dashboard?actionTaken",
        },
    ];

    return (
        <div className="w-full max-h-max flex flex-col md:flex-row items-center justify-between gap-5">
            {Analysis.map(({ id, icon, title, count, subtitle, href }) => (
                <Link
                    key={id}
                    href={href}
                    className="border rounded-[20px] p-5 h-full w-full md:flex-1 flex flex-col items-start gap-5 hover:opacity-50 transition"
                >
                    <div className="flex flex-row items-center gap-5">
                        {icon}
                        <h3>{title}</h3>
                    </div>
                    <div className="flex flex-row items-start justify-between gap-10">
                        <h1>{count}</h1>
                        <span className="h-[25px] md:h-[50px] w-[1px] bg-neutral-200"></span>
                        <h5 className="text-[var(--lighttext)]">{subtitle}</h5>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AppliedCounts;
