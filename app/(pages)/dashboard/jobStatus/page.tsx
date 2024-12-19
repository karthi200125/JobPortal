'use client'

import { useQuery } from "@tanstack/react-query";
import JobList from "../../jobs/JobLists/JobList"
import StatusSide from "./StatusSide"
import { getAppliedJobs } from "@/actions/jobapplication/getAppliedJobs";
import { useSelector } from "react-redux";
import { getUserById } from "@/actions/auth/getUserById";
import Image from "next/image";

const JobStatus = () => {
    const user = useSelector((state: any) => state.user.user)

    const { data: appliedjObs, isPending: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: async () => await getAppliedJobs(user?.id),
    });

    console.log("jobs", appliedjObs)

    const { data, isPending } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: async () => await getUserById(user?.id),
    });

    return (
        <div className="relative w-full p-5 space-y-5">

            <div className="w-full pb-5 borderb flex flex-row items-center justify-between">
                <div>
                    <h2>Job Application Status</h2>
                    <h6 className="text-[var(--lighttext)]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, a?</h6>
                </div>
                <div className="flex flex-row items-center gap-5">
                    <h1>{data?.jobApplications?.length || 0}</h1>
                    <span className="h-[30px] w-[1px] bg-[var(--lighttext)]"></span>
                    <h4>Total Applies</h4>
                </div>
            </div>

            <div className="flex flex-row items-start gap-5">

                <div className="w-[40%] jobStatusHeight overflow-y-auto">
                    {appliedjObs?.data?.map((job) => (
                        <div
                            key={job?.id}
                            className={`w-full min-h-[100px] border-b-[1px] border-solid border-neutral-300 flex flex-row items-start gap-5 p-2 hover:bg-neutral-200 trans cursor-pointer`}
                        >
                            <div className="w-[80px] h-[80px] rounded-md bg-neutral-100 relative">
                                <Image src={''} fill alt="" className="absolute left-0 top-0 w-full h-full" />
                            </div>
                            <div className="space-y-2 w-full">
                                <h3 className="text-lg font-bold capitalize">FUll stack developer</h3>
                                <h5 className="text-sm font-semibold capitalize">Amazon</h5>
                                <div className="flex flex-row justify-between items-start">
                                    <h5>address city country</h5>
                                    <h6>2 onths ago</h6>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* <div className="w-[40%] jobStatusHeight overflow-y-auto">
                    {appliedjObs?.data?.map((job) => (
                        <JobList isHover key={job?.id} job={job} />
                    ))}
                    
                </div> */}

                <div className="w-[60%] jobStatusHeight space-y-5 overflow-y-auto">
                    <StatusSide appliedjObs={appliedjObs} />

                    {/* <div className="space-y-5">
                        <div className="space-y-1">
                            <h3>Similar Jobs</h3>
                            <h6>You might be intrested</h6>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="border rounded-md ">
                                <JobList />
                            </div>
                        </div>
                    </div> */}

                </div>

            </div>

        </div>
    )
}

export default JobStatus