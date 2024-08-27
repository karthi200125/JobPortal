'use client'

import FilterNavbar from '@/components/FilterNavbar/FilterNavbar'
import React from 'react'
import JobLists from './JobLists/JobLists'
import JobDesc from './Job/Job'
import { useQuery } from '@tanstack/react-query'
import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs'

const Jobs = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['getFilterAllJobs'],
        queryFn: async () => await getFilterAllJobs(),
    });

    return (
        <div className='w-full relative'>
            <FilterNavbar />
            <div className='w-full jobsh flex flex-row items-start'>
                <div className='w-full md:w-[40%] h-full'>
                    <JobLists Jobs={data} isLoading={isLoading} />
                </div>
                <div className='hidden md:block w-full md:w-[60%] h-full'>
                    <JobDesc />
                </div>
            </div>
        </div>
    )
}

export default Jobs