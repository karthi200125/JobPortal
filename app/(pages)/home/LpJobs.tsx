'use client'

import { GetLpJobs } from "@/actions/job/getLpJobs";
import LpJobsSkeleton from "@/Skeletons/LpJobsSkeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const LpJobs = () => {
    const { data: jobs, isPending } = useQuery({
        queryKey: ['getJobs'],
        queryFn: async () => await GetLpJobs(),
    });

    console.log(jobs)

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
            {isPending ? (
                <LpJobsSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {jobs?.map((job: any) => (
                        <div key={job.id} className="bg-white/[0.05] p-5 rounded-xl overflow-hidden space-y-7">

                            {/* Job Image & Title */}
                            <div className="space-y-3">
                                <Image
                                    src="https://img.freepik.com/premium-vector/color-green-blue-yellow-shape-diagram-colorful-modern-triangle-logo-icon-sign-file-send-document_981536-460.jpg"
                                    alt="Company Logo"
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px] rounded-lg bg-black object-cover"
                                />
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <h5 className="text-xs text-neutral-300">
                                    {job.location} · ${job.salary}
                                </h5>
                            </div>

                            {/* Job Description */}
                            <h4 className="text-white/60 text-sm">
                                {job.description || "No description available."}
                            </h4>

                            {/* Job Skills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {job.skills?.map((skill: string, index: number) => (
                                    <div key={index} className="rounded-full px-5 py-2 bg-black text-white text-sm">
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
