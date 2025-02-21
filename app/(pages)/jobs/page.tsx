'use client';

import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';
import FilterNavbar from '@/components/FilterNavbar/FilterNavbar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import JobDesc from './Job/Job';
import JobLists from './JobLists/JobLists';
import Title from '@/lib/MetaTitle';

const Jobs = ({ searchParams }: { searchParams: any }) => {

    const safeSearchParams = searchParams ?? new URLSearchParams();

    const currentPage = Number(safeSearchParams.page) || 1;

    const [jobs, setJobs] = useState<any[]>([]);
    const [count, setCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    const user = useSelector((state: any) => state.user.user);
    const userId = user?.id;

    const fetchJobs = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            const jobsData: any = await getFilterAllJobs(userId, safeSearchParams);
            setJobs(jobsData?.jobs);
            setCount(jobsData?.count);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setIsLoading(false);
        }
    }, [userId, safeSearchParams]);

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
            <Title
                title={`${job?.jobTitle || "Explore Job Listings"} | JOBIFY`}
                description="Browse thousands of job listings from top companies. Find remote, full-time, and part-time job opportunities."
                keywords="jobs, job listings, hiring, careers, remote jobs, find jobs"
            />

            <FilterNavbar />
            <div className="w-full flex flex-row items-start">
                <div className="w-full md:w-[40%] jobsh overflow-y-auto">
                    <JobLists
                        Jobs={jobs}
                        isLoading={isLoading}
                        onSelectedJob={handleSelectedJob}
                        count={count}
                        currentPage={currentPage}
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
