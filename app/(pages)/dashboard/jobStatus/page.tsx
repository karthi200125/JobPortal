'use client';

import { getUserById } from "@/actions/auth/getUserById";
import { getAppliedJobs } from "@/actions/jobapplication/getAppliedJobs";
import BottomDrawer from "@/components/BottomDrawer";
import Title from "@/lib/MetaTitle";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusSide from "./StatusSide";
import JobListsSkeleton from "@/Skeletons/JobListsSkeleten";

const JobStatus = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data, isLoading: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: async () => await getAppliedJobs(user?.id),
        enabled: !!user?.id,
    });

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: async () => await getUserById(user?.id),
        enabled: !!user?.id,
    });

    const appliedJobs = data?.data || [];

    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        if (appliedJobs.length > 0) {
            const firstJob = appliedJobs[0];
            setSelectedJob(firstJob.id);
            setJob(firstJob);
        }
    }, [appliedJobs]);

    const handleSelectJob = (selectedJob: any) => {
        setSelectedJob(selectedJob?.id);
        setJob(selectedJob);
    };

    const renderJobs = (isMobile: boolean) => {
        if (appliedJobsLoading) {
            return <JobListsSkeleton />;
        }

        if (appliedJobs.length === 0) {
            return <h4 className="p-3">No Jobs Yet!</h4>;
        }

        return appliedJobs.map((job: any) => (
            <div key={job.id} onClick={() => handleSelectJob(job)}>
                {isMobile ? (
                    <BottomDrawer body={job ? <StatusSide job={job} user={userData} /> : <h4 className="p-3">No Jobs Yet!</h4>}>
                        <JobStatusJobsList job={job} selectedJob={selectedJob} handleSelectJob={handleSelectJob} />
                    </BottomDrawer>
                ) : (
                    <JobStatusJobsList job={job} selectedJob={selectedJob} handleSelectJob={handleSelectJob} />
                )}
            </div>
        ));
    };

    return (
        <div className="relative w-full py-5 md:p-5 space-y-5">
            <Title
                title="Job Status | JOBIFY"
                description="Track job application progress, interview status, and hiring decisions with JOBIFY."
                keywords="job status, application tracking, interview updates, hiring process"
            />

            {/* Header */}
            <div className="w-full pb-5 border-b flex flex-row items-center justify-between">
                <div className="space-y-2">
                    <h2>Job Application Status <span className="md:hidden">({userData?.jobApplications?.length || 0})</span></h2>
                    <h6 className="text-[var(--lighttext)]">
                        Track your job applications, stay updated on interview schedules
                    </h6>
                </div>
                <div className="hidden md:flex flex-row items-center gap-5">
                    <h1>{userData?.jobApplications?.length || 0}</h1>
                    <span className="h-[30px] w-[1px] bg-[var(--lighttext)]"></span>
                    <h4>Total Applies</h4>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-row items-start gap-5">
                {/* Job List */}
                <div className="w-full lg:w-[40%] jobStatusHeight overflow-y-auto">
                    <div className="lg:hidden">{renderJobs(true)}</div>
                    <div className="hidden lg:block">{renderJobs(false)}</div>
                </div>

                {/* Job Details */}
                <div className="hidden lg:block w-[60%] jobStatusHeight space-y-5 overflow-y-auto">
                    {job ? <StatusSide job={job} user={userData} /> : <h4 className="p-3">No Jobs Yet!</h4>}
                </div>
            </div>
        </div>
    );
};

export default JobStatus;

const JobStatusJobsList = ({
    job,
    selectedJob,
    handleSelectJob
}: {
    job: any;
    selectedJob: number | null;
    handleSelectJob: (job: any) => void;
}) => {
    return (
        <div
            key={job?.id}
            className={`w-full min-h-[100px] border-b border-solid border-neutral-300 flex flex-row items-start gap-5 p-2 hover:bg-neutral-100 transition cursor-pointer 
            ${job?.id === selectedJob ? '!bg-neutral-100' : ''}`}
            onClick={() => handleSelectJob(job)}
        >
            <div className="w-[40px] md:w-[80px] h-[40px] md:h-[80px] rounded-md bg-neutral-100 relative overflow-hidden">
                <Image
                    src={job?.company?.companyImage || '/default-image.jpg'}
                    fill
                    alt="Company Logo"
                    className="absolute left-0 top-0 w-full h-full object-cover"
                />
            </div>
            <div className="space-y-2 w-full text-start">
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
    );
};
