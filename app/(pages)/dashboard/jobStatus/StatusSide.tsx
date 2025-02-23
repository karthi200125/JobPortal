'use client'

import Title from "@/lib/MetaTitle";
import JobProgress from "./JobProgress";
import { useQuery } from "@tanstack/react-query";
import { getTotalAndSelectedApplicants } from "@/actions/jobapplication/getTotalAndSelectedApplicants";

const StatusSide = ({ job, user }: any) => {

    const jobApplication = user?.jobApplications?.find((ja: any) => ja?.jobId === job?.id);

    const { data, isLoading } = useQuery({
        queryKey: ['getTotalAndSelectedApplicants', job?.id],
        queryFn: async () => await getTotalAndSelectedApplicants(job?.id),
    });

    return (
        <>
            <Title
                title={`${job?.jobTitle} Status | JOBIFY`}
                description="Track job application progress, interview status, and hiring decisions with JOBIFY."
                keywords="job status, application tracking, interview updates, hiring process"
            />
            <div className="w-full h-full p-5 space-y-5">

                <div className="space-y-2 borderb pb-5">
                    <h2 className="capitalize">{job?.jobTitle}</h2>
                    <h4 className="uppercase">{job?.company?.companyName}</h4>
                </div>

                <div className="space-y-2">
                    <h3>Application Status</h3>
                    <div className="w-full border p-5 overflow-x-auto rounded-md">
                        <JobProgress jobApplication={jobApplication} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3>Activity on this job</h3>
                    <div className="w-full md:max-w-max border p-5 rounded-md flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10">
                        <div className="flex flex-row md:flex-col items-center gap-5">
                            <h4>Shortlisted Applicants</h4>
                            <h3 className="font-bold">{data?.data?.SelectedApplicants?.length || 0}</h3>
                        </div>
                        <span className="hidden md:block h-[40px] w-[1px] bg-neutral-200"></span>
                        <div className="flex flex-row md:flex-col items-center gap-5">
                            <h4>Total Applicants for this job</h4>
                            <h3 className="font-bold">{data?.data?.TotalApplicants?.length || 0}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default StatusSide