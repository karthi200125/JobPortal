'use client'

import { getCompanyById } from "@/actions/company/getCompanyById";
import { useQuery } from "@tanstack/react-query";
import JobCompany from "./JobCompany";
import JobDescription from "./JobDescription";
import JobPremium from "./JobPremium";
import JobRecruiter from "./JobRecruiter";
import JobTitles from "./JobTitles";

const JobDesc = ({ job }: any) => {

    const cId = job?.companyId

    const { data, isPending } = useQuery({
        queryKey: ['getCompany', cId],
        queryFn: async () => await getCompanyById(cId),
    });

    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            <JobTitles job={job} company={data} isPending={isPending}/>
            <JobRecruiter job={job} company={data} />
            <JobDescription job={job} isPending={isPending}/>
            <JobPremium />
            <JobCompany company={data} isPending={isPending}/>
        </div>
    )
}

export default JobDesc