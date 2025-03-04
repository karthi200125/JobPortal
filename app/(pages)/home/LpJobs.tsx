'use client'

import { GetLpJobs } from "@/actions/job/getLpJobs";
import LpJobsSkeleton from "@/Skeletons/LpJobsSkeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import noImage from '@/public/noImage.webp'
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const LpJobs = () => {

    const { data: jobs, isPending } = useQuery({
        queryKey: ['getLpJobs'],
        queryFn: async () => await GetLpJobs(),
    });

    const [sanitizedDescriptions, setSanitizedDescriptions] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (jobs) {
            const sanitized = jobs.reduce((acc: { [key: string]: string }, job: any) => {
                acc[job.id] = job.jobDesc ? DOMPurify.sanitize(job.jobDesc) : '';
                return acc;
            }, {});
            setSanitizedDescriptions(sanitized);
        }
    }, [jobs]);

    return (
        <div className="w-full min-h-screen p-2 lg:p-10 space-y-10 md:space-y-20">

            {/* Header Section */}
            <div className="text-center w-full lg:w-[50%] mx-auto space-y-5 text-white">
                <h1 className="text-3xl font-bold">2000+ Dream Job Openings</h1>
                <h4 className="text-white/60">
                    Choose the plan that best fits your hiring needs. Whether you are a startup or a large enterprise, our plans are designed to help you find the right talent efficiently and effectively.
                </h4>
            </div>

            {/* Jobs List */}
            {isPending ? (
                <LpJobsSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {jobs && jobs?.map((job: any) => (
                        <div key={job.id} className="bg-white p-5 rounded-xl overflow-hidden space-y-4 lg:space-y-7 cursor-pointer trans text-black">

                            {/* Job Image & Title */}
                            <div className="space-y-1 lg:space-y-3">
                                <Image
                                    src={job?.company?.companyImage || noImage.src}
                                    alt="Company Logo"
                                    width={100}
                                    height={100}
                                    className="w-[40px] md:w-[100px] h-[40px] md:h-[100px] rounded-lg bg-white object-cover"
                                />
                                <h3 className="text-xl font-bold capitalize">{job.jobTitle}</h3>
                                <h5 className="text-xs font-semibold capitalize">
                                    {job.mode} Work · ${job.salary}
                                </h5>
                            </div>

                            {/* Job Description */}
                            <h4 className="text-neutral-600 text-sm line-clamp-3">
                                <div className="prose max-w-none text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: sanitizedDescriptions[job.id] || '' }} />
                            </h4>

                            {/* Job Skills */}
                            <div className="flex flex-wrap items-center gap-2 ">
                                {job.skills?.slice(0, 5).map((skill: string, index: number) => (
                                    <div key={index} className="rounded-full px-5 py-2 bg-black text-white text-sm font-bold capitalize">
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
