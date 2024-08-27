'use client'

import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { GoPlus } from "react-icons/go"
import AppliedCounts from "./AppliedCounts"
import AppliedJobs from "./AppliedJobs"
import { useSelector } from "react-redux"

const JobStatus = () => {
    const router = useRouter()

    const userRole = useSelector((state: any) => state.user.user?.role)

    console.log(userRole)

    return (
        <div className="w-full min-h-screen pt-5 space-y-5 ">
            <div className="flex flex-row items-center justify-between">
                <h2 className="">Dashboard</h2>
                {userRole === 'RECRUITER' || userRole === "ORGANIZATION" &&
                    <Button variant="border" onClick={() => router.push('/createJob')} icon={<GoPlus size={20} />}>
                        Create Job
                    </Button>
                }
            </div>
            <AppliedCounts />
            <AppliedJobs />
        </div>
    )
}

export default JobStatus