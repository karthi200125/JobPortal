'use client';

import { getFilterAllJobs } from '@/actions/job/getFilterAllJobs';
import Title from '@/lib/MetaTitle';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Jobb from './Jobb';

const Jobs = ({ searchParams }: { searchParams: any }) => {

    const safeSearchParams = searchParams ?? new URLSearchParams();
    const currentPage = Number(safeSearchParams.page) || 1;

    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [job, setJob] = useState<any>(null);

    const user = useSelector((state: any) => state.user.user);

    const { data, isPending } = useQuery({
        queryKey: ['getJobs', user?.id, safeSearchParams],
        queryFn: () => getFilterAllJobs(user?.id, safeSearchParams),
        enabled: !!user?.id,
    });

    console.log('React Query Data:', data);

    const jobs = data?.jobs ?? []
    const count = data?.count ?? 0


    useEffect(() => {
        const job = selectedJob ? jobs.find((job: any) => job?.id === selectedJob) : jobs[0];
        setJob(job)
    }, [selectedJob, jobs]);

    console.log('React Query Data:', job);

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

            <Jobb
                count={count}
                currentPage={currentPage}
                jobs={jobs}
                job={job}
                isPending={isPending}
                onSelectedJob={handleSelectedJob}
            />
        </div>
    );
};

export default Jobs;
