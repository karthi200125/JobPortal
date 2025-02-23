'use client'

import { getCompanyById } from "@/actions/company/getCompanyById";
import { useQuery } from "@tanstack/react-query";
import JobCompany from "./JobCompany";
import JobDescription from "./JobDescription";
import JobPremium from "./JobPremium";
import JobRecruiter from "./JobRecruiter";
import JobTitles from "./JobTitles";
import { useSelector } from "react-redux";
import { NextSeo } from 'next-seo';

const JobDesc = ({ job, refetchJobs }: any) => {

    const user = useSelector((state: any) => state.user.user);
    const cId = job?.companyId

    const { data, isPending } = useQuery({
        queryKey: ['getCompany', cId],
        queryFn: async () => await getCompanyById(cId),
    });

    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            <NextSeo
                title="JOBS PAGE Simple Usage Example"
                description="A short description goes here."
            />
            <JobTitles job={job} company={data} isPending={(isPending || !job)} refetchJobs={(refetchJobs || !job)} />
            <JobRecruiter job={job} company={data} isPending={(isPending || !job)} />
            <JobDescription job={job} isPending={(isPending || !job)} />
            {!user?.isPro &&
                <JobPremium />
            }
            {user?.role !== "ORGANIZATION" &&
                <JobCompany company={data} isPending={(isPending || !job)} />
            }
        </div>
    )
}

export default JobDesc