'use client';

import { useQuery } from "@tanstack/react-query";
import JobList from "../../jobs/JobLists/JobList";
import StatusSide from "./StatusSide";
import { getAppliedJobs } from "@/actions/jobapplication/getAppliedJobs";
import { useSelector } from "react-redux";
import { getUserById } from "@/actions/auth/getUserById";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";
import Title from "@/lib/MetaTitle";

const JobStatus = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data, isLoading: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: async () => await getAppliedJobs(user?.id),
    });

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: async () => await getUserById(user?.id),
    });

    const appliedJobs: any = data || []

    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        if (appliedJobs?.data?.length > 0) {
            const firstJob = appliedJobs.data[0];
            setSelectedJob(firstJob.id);
            setJob(firstJob);
        }
    }, [data]);

    const handleSelectJob = (job: any) => {
        setSelectedJob(job?.id);
        setJob(job);
    };

    return (
        <div className="relative w-full p-5 space-y-5">
            <Title
                title="Job Status | JOBIFY"
                description="Track job application progress, interview status, and hiring decisions with JOBIFY."
                keywords="job status, application tracking, interview updates, hiring process"
            />

            {/* Header */}
            <div className="w-full pb-5 border-b flex flex-row items-center justify-between">
                <div>
                    <h2>Job Application Status</h2>
                    <h6 className="text-[var(--lighttext)]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, a?
                    </h6>
                </div>
                <div className="flex flex-row items-center gap-5">
                    <h1>{userData?.jobApplications?.length || 0}</h1>
                    <span className="h-[30px] w-[1px] bg-[var(--lighttext)]"></span>
                    <h4>Total Applies</h4>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-row items-start gap-5">
                {/* Job List */}
                <div className="w-[40%] jobStatusHeight overflow-y-auto">
                    {appliedJobsLoading ? (
                        <div>Loading...</div>
                    ) : (
                        appliedJobs?.data?.map((job: any) => (
                            <div
                                key={job?.id}
                                className={`
                                    ${job?.id === selectedJob ? '!bg-neutral-100' : ''}
                                    w-full min-h-[100px] border-b-[1px] border-solid border-neutral-300 flex flex-row items-start gap-5 p-2 hover:bg-neutral-100 trans cursor-pointer
                                `}
                                onClick={() => handleSelectJob(job)}
                            >
                                <div className="w-[80px] h-[80px] rounded-md bg-neutral-100 relative overflow-hidden">
                                    <Image
                                        src={job?.company?.companyImage || ''}
                                        fill
                                        alt="Company Logo"
                                        className="absolute left-0 top-0 w-full h-full"
                                    />
                                </div>
                                <div className="space-y-2 w-full">
                                    <h3 className="text-lg font-bold capitalize">{job?.jobTitle}</h3>
                                    <h5 className="text-sm font-semibold capitalize">{job?.company?.companyName}</h5>
                                    <div className="flex flex-row justify-between items-start">
                                        <h5 className="text-xs">
                                            {job?.city}, {job?.state}
                                        </h5>
                                        <h5 className="text-xs">{moment(job?.createdAt).fromNow()}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Job Details */}
                <div className="w-[60%] jobStatusHeight space-y-5 overflow-y-auto">
                    {job ? <StatusSide job={job} user={userData} /> : <div>Loading...</div>}
                </div>
            </div>
        </div>
    );
};

export default JobStatus;
