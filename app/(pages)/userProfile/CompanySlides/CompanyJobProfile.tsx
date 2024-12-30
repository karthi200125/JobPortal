'use client'

import { useQuery } from '@tanstack/react-query';
import React from 'react'
import JobList from '../../jobs/JobLists/JobList';
import { getCompanyJobs } from '@/actions/company/getCompanyJobs';

const CompanyJobProfile = ({ company }: any) => {

    const { data, isPending } = useQuery({
        queryKey: ['getCompanyJobs', company?.id],
        queryFn: async () => await getCompanyJobs(company?.id),
    });

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            {data?.map((job: any) => (
                <div key={job?.id} className="border rounded-md p-5">
                    <JobList job={job} />
                </div>
            ))}
        </div>
    )
}

export default CompanyJobProfile