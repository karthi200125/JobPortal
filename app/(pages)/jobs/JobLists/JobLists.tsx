'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BottomDrawer from '@/components/BottomDrawer';
import JobDesc from '../Job/Job';
import JobList from './JobList';
import JobListsSkeleton from '@/Skeletons/JobListsSkeleten';

interface JobListsProps {
  Jobs?: any[];
  isLoading?: boolean;
  onSelectedJob?: (jobId: number) => void;
}

const JobLists = ({ Jobs = [], isLoading = true, onSelectedJob }: JobListsProps) => {
  const searchParams = useSearchParams();

  const query = useMemo(() => searchParams.get('q'), [searchParams]);
  const queryCountry = useMemo(() => searchParams.get('location') || 'India', [searchParams]);

  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  useEffect(() => {
    if (Jobs.length > 0 && selectedJob === null) {
      setSelectedJob(Jobs[0].id);
    }
  }, [Jobs, selectedJob]);

  const handleSelectJob = useCallback(
    (jobId: number) => {
      setSelectedJob(jobId);
      onSelectedJob?.(jobId);
    },
    [onSelectedJob]
  );

  const renderHeader = () => (
    <div className="z-[2] sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
      <h5 className="text-sm font-bold">
        {query ? `${query} Jobs` : 'Jobs'}{' '}
        <span className="font-normal text-xs">in</span> {queryCountry}
      </h5>
      <h5 className="text-xs">{Jobs.length} Results</h5>
    </div>
  );

  const renderJobs = (isMobile: boolean) => {
    if (isLoading) {
      return <JobListsSkeleton />;
    }

    if (Jobs.length === 0) {
      return <h4 className="p-3">No Jobs Found</h4>;
    }

    return Jobs.map((job) => (
      <div key={job.id} onClick={() => handleSelectJob(job.id)}>
        {isMobile ? (
          <BottomDrawer body={<JobDesc job={job} />}>
            <JobList isHover job={job} selectedJob={selectedJob} border />
          </BottomDrawer>
        ) : (
          <JobList isHover job={job} selectedJob={selectedJob} border />
        )}
      </div>
    ));
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      {renderHeader()}
      <div className="md:hidden">{renderJobs(true)}</div>
      <div className="hidden md:block">{renderJobs(false)}</div>
    </div>
  );
};

export default JobLists;
