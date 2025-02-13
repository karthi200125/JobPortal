'use client';

import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';
import FilterNavbar from '@/components/FilterNavbar/FilterNavbar';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import JobDesc from './Job/Job';
import JobLists from './JobLists/JobLists';

const Jobs = ({ searchParams }: { searchParams: any }) => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    const user = useSelector((state: any) => state.user.user);
    const userId = user?.id;
    
    const fetchJobs = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            const jobsData = await getFilterAllJobs(userId, searchParams);
            setJobs(jobsData);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setIsLoading(false);
        }
    }, [userId, searchParams]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const job = useMemo(() => {
        return selectedJob ? jobs.find((job) => job?.id === selectedJob) : jobs[0];
    }, [selectedJob, jobs]);

    const handleSelectedJob = useCallback((jobId: any) => {
        setSelectedJob(jobId);
    }, []);

    return (
        <div className="w-full relative">
            <FilterNavbar />
            <div className="w-full flex flex-row items-start">
                <div className="w-full md:w-[40%] jobsh overflow-y-auto">
                    <JobLists
                        Jobs={jobs}
                        isLoading={isLoading}
                        onSelectedJob={handleSelectedJob}
                    />
                </div>
                <div className="hidden md:block w-full md:w-[60%] overflow-y-auto jobsh">
                    <JobDesc
                        job={job}
                        refetchJobs={fetchJobs}
                    />
                </div>
            </div>
        </div>
    );
};

export default Jobs;
