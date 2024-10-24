'use client';

import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';
import FilterNavbar from '@/components/FilterNavbar/FilterNavbar';
import { useEffect, useState } from 'react';
import JobDesc from './Job/Job';
import JobLists from './JobLists/JobLists';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);    

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true); 
            try {
                const jobsData = await getFilterAllJobs(); 
                setJobs(jobsData); 
            } catch (err) {
                console.error('Error fetching jobs:', err);                
            } finally {
                setIsLoading(false); 
            }
        };

        fetchJobs();
    }, []);

    const job = jobs[0] || {}; 

    return (
        <div className='w-full relative'>
            <FilterNavbar />
            <div className='w-full flex flex-row items-start'>
                <div className='w-full md:w-[40%] jobsh overflow-y-auto'>
                    <JobLists Jobs={jobs} isLoading={isLoading} /> 
                </div>
                <div className='hidden md:block w-full md:w-[60%] overflow-y-auto jobsh'>
                    <JobDesc job={job} />
                </div>
            </div>            
        </div>
    );
};

export default Jobs;
