'use client'

import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import JobList from '../../jobs/JobLists/JobList';

const CompanyJobProfile = () => {

    const { data = [], isPending } = useQuery({
        queryKey: ['getCompanyJobs'],
        queryFn: async () => await getFilterAllJobs(),
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