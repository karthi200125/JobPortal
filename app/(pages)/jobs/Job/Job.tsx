'use client'

import CompanyDetails from "./JobCompany";
import JobPremium from "./JobPremium";
import JobDescription from "./JobDescription";
import JobTitles from "./JobTitles";
import JobRecruiter from "./JobRecruiter";
import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "@/actions/company/getCompanyById";

const JobDesc = ({ job }: any) => {

    const cId = job?.companyId

    const { data, isLoading } = useQuery({
        queryKey: ['getCompany', cId],
        queryFn: async () => await getCompanyById(cId),
    });

    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            <JobTitles job={job} company={data} />
            <JobRecruiter />
            <JobDescription />
            <JobPremium />
            <CompanyDetails />
        </div>
    )
}

export default JobDesc