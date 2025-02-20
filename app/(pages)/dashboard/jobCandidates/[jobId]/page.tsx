'use client';

import { useState } from "react";
import { FaSuitcase, FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import JobDescription from "../../../jobs/Job/JobDescription";
import Candidates from "../Candidates";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getJobUsingId } from "@/actions/job/getJobUsingId";
import moment from "moment";
import { getApplicationCandidates } from "@/actions/jobapplication/getApplicationcandidates";

const JobCandidates = () => {
    const params = useParams();
    const jobId = parseInt(params.jobId as string, 10);

    const options = ["EarlyApplicants", "TopApplicants"];
    const [type, setType] = useState("EarlyApplicants");
    
    const { data: job, isPending } = useQuery({
        queryKey: ["getJob", jobId],
        queryFn: async () => getJobUsingId(jobId),
        enabled: !!jobId,
    });
    
    const { data: candidates, isPending: candidatesPending } = useQuery({
        queryKey: ["getJobApplicationCandidates", jobId],
        queryFn: async () => getApplicationCandidates(jobId),
        enabled: !!jobId,
    });

    return (
        <div className="p-5 w-full h-screen relative flex flex-col md:flex-row items-start gap-5">
            {/* Job Details Section */}
            <div className="flex-1 space-y-3">
                <h2 className="capitalize">{job?.jobTitle}</h2>
                <h4 className="text-[var(--textBlur)]">
                    {job?.city}, {job?.state}, {job?.country}. {moment(job?.createdAt).fromNow()} (
                    {candidates?.length || 0} applicants)
                </h4>
                <div className="flex flex-row gap-3 items-center">
                    <FaSuitcase size={20} />
                    <h5 className="bg-neutral-200 p-1 rounded-[5px] flex-center px-3">{job?.mode}</h5>
                    <h5 className="bg-neutral-200 p-1 rounded-[5px] flex-center px-3">{job?.type}</h5>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <FaListCheck size={20} />
                    <h5>10 skills match your profile - you may be a good fit</h5>
                </div>

                <JobDescription job={job} isPending={isPending} />
            </div>

            {/* Candidates Section */}
            <div className="flex-1 border rounded-md p-5 space-y-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between pb-5 border-b gap-5">
                    <div className="flex-1 flex flex-row items-center gap-3">
                        <FaUsers size={20} />
                        <h3 className="font-bold">Applied Candidates</h3>
                        ({candidates?.length || 0})
                    </div>

                    {/* Select Dropdown for Filtering Candidates */}
                    <Select value={type} onValueChange={(value) => setType(value)}>
                        <SelectTrigger className="w-full flex-1">
                            <SelectValue placeholder="Early Applicants" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Candidates List */}
                <Candidates job={job} candidates={candidates} isPending={candidatesPending} />
            </div>
        </div>
    );
};

export default JobCandidates;
