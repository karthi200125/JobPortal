'use client';

import FilterNavbar from '@/components/FilterNavbar/FilterNavbar';
import React from 'react';
import JobLists from './JobLists/JobLists';
import JobDesc from './Job/Job';
import { useQuery } from '@tanstack/react-query';
import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';

const Jobs: React.FC = () => {
    const { data = [], isLoading } = useQuery({
        queryKey: ['getFilterAllJobs'],
        queryFn: async () => getFilterAllJobs(),
    });

    const job = data[0] || {};

    return (
        <div className='w-full relative'>
            <FilterNavbar />
            <div className='w-full flex flex-row items-start'>
                <div className='w-full md:w-[40%] jobsh overflow-y-auto'>
                    <JobLists Jobs={data} isLoading={isLoading} />
                </div>
                <div className='hidden md:block w-full md:w-[60%] overflow-y-auto jobsh'>
                    <JobDesc job={job} />
                </div>
            </div>
        </div>
    );
};

export default Jobs;
