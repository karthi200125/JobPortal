'use client';

import FilterNavbar from '@/components/FilterNavbar/FilterNavbar';
import JobDesc from './Job/Job';
import JobLists from './JobLists/JobLists';
import { useState } from 'react';

const Jobs = ({ user, initialJobs }: { user: any, initialJobs: any[] }) => {
    const [jobs, setJobs] = useState(initialJobs || []);
    const [selectedJob, setSelectedJob] = useState('');

    const job = selectedJob ? jobs.find((job) => job?.id === selectedJob) : jobs[0];

    return (
        <div className="w-full relative">
            <FilterNavbar />
            <div className="w-full flex flex-row items-start">
                <div className="w-full md:w-[40%] jobsh overflow-y-auto">
                    <JobLists
                        Jobs={jobs}
                        isLoading={!jobs.length}
                        onSelectedJob={(jobId: any) => setSelectedJob(jobId)}
                    />
                </div>
                <div className="hidden md:block w-full md:w-[60%] overflow-y-auto jobsh">
                    <JobDesc job={job} />
                </div>
            </div>
        </div>
    );
};

export default Jobs;
