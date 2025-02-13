'use client'

import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { GoPlus } from "react-icons/go"
import AppliedCounts from "./AppliedCounts"
import AppliedJobs from "./AppliedJobs"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getAppliedJobs } from "@/actions/jobapplication/getAppliedJobs"
import { getUserById } from "@/actions/auth/getUserById"
import PostedJobs from "./PostedJobs"
import { IoIosPeople } from "react-icons/io";


const Dashboard = () => {
    const user = useSelector((state: any) => state.user.user)

    const router = useRouter()
    const isRecruiter = user?.role === 'RECRUITER'
    const isCandidate = user?.role === 'CANDIDATE'
    const isORG = user?.role === "ORGANIZATION"

    const { data: appliedjObs, isPending: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: async () => await getAppliedJobs(user?.id),
    });

    const { data, isPending } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: async () => await getUserById(user?.id),
    });

    return (
        <div className="w-full min-h-screen pt-5 space-y-5 px-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <h2 className="">Dashboard</h2>
                <div className="flex flex-row items-center gap-5">
                    {(isRecruiter || isORG) &&
                        <Button variant="border" onClick={() => router.push('/dashboard/employees')} icon={<IoIosPeople size={20} />}>
                            Employees
                        </Button>
                    }
                    {(isRecruiter || isORG) &&
                        <Button variant="border" onClick={() => router.push('/createJob')} icon={<GoPlus size={20} />}>
                            Create Job
                        </Button>
                    }
                </div>
            </div>
            <AppliedCounts appliedJobs={appliedjObs?.data} user={data} />
            {!isORG &&
                <AppliedJobs aplliedJobs={appliedjObs?.data} isLoading={appliedJobsLoading} />
            }
            {!isCandidate &&
                <PostedJobs postedJobs={data?.postedJobs} isLoading={isPending} user={data} />
            }
        </div>
    )
}

export default Dashboard