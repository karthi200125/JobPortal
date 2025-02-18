'use client'

import { getCompanyById } from "@/actions/company/getCompanyById";
import { useQuery } from "@tanstack/react-query";
import JobCompany from "./JobCompany";
import JobDescription from "./JobDescription";
import JobPremium from "./JobPremium";
import JobRecruiter from "./JobRecruiter";
import JobTitles from "./JobTitles";
import { useSelector } from "react-redux";

const JobDesc = ({ job, refetchJobs }: any) => {

    const user = useSelector((state: any) => state.user.user);
    const cId = job?.companyId

    const { data, isPending } = useQuery({
        queryKey: ['getCompany', cId],
        queryFn: async () => await getCompanyById(cId),
    });

    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            <JobTitles job={job} company={data} isPending={isPending} refetchJobs={refetchJobs} />
            <JobRecruiter job={job} company={data} />
            <JobDescription job={job} isPending={isPending} />
            {!user?.isPro &&
                <JobPremium />
            }
            <JobCompany company={data} isPending={isPending} />
        </div>
    )
}

export default JobDesc