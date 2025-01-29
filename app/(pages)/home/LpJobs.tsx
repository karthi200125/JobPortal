'use client'

import { GetLpJobs } from "@/actions/job/getLpJobs";
import LpJobsSkeleton from "@/Skeletons/LpJobsSkeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

const LpJobs = () => {

    const [jobs, setJobs] = useState([])
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        const getJobs = async () => {
            try {
                setisLoading(true)
                const job = await GetLpJobs()
                setJobs(job)
            } catch (err) {
                console.log(err)
            } finally {
                setisLoading(false)
            }
        }
        getJobs()
    }, [])

    return (
        <div className="w-full min-h-screen p-10 space-y-20">

            {/* Header Section */}
            <div className="text-center w-[50%] mx-auto space-y-5 text-white">
                <h1 className="text-3xl font-bold">2000+ Dream Job Openings</h1>
                <h4 className="text-white/60">
                    Choose the plan that best fits your hiring needs. Whether you are a startup or a large enterprise, our plans are designed to help you find the right talent efficiently and effectively.
                </h4>
            </div>

            {/* Jobs List */}
            {isLoading ? (
                <LpJobsSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {jobs?.map((job: any) => (
                        <div key={job.id} className="bg-white p-5 rounded-xl overflow-hidden space-y-7 cursor-pointer trans text-black">

                            {/* Job Image & Title */}
                            <div className="space-y-3">
                                <Image
                                    src={job?.company?.companyImage || ''}
                                    alt="Company Logo"
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px] rounded-lg bg-black object-cover"
                                />
                                <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                                <h5 className="text-xs font-semibold">
                                    {job.mode} Work · ${job.salary}
                                </h5>
                            </div>

                            {/* Job Description */}
                            <h4 className="text-neutral-600 text-sm">
                                {/* {job.description || "No description available."} */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit earum sed dolorem eum voluptates porro magnam debitis voluptatem quaerat aut?
                            </h4>

                            {/* Job Skills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {job.skills?.map((skill: string, index: number) => (
                                    <div key={index} className="rounded-full px-5 py-2 bg-black text-white text-sm font-bold">
                                        {skill}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LpJobs;
