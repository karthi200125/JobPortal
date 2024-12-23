'use client';

import BottomDrawer from '@/components/BottomDrawer';
import JobListsSkeleten from '@/Skeletons/JobListsSkeleten';
import React, { useEffect, useState } from 'react';
import JobDesc from '../Job/Job';
import JobList from './JobList';

interface JobListsProps {
  Jobs?: any[];
  isLoading?: boolean;
  onSelectedJob?: (jobId: number) => void;
}

const JobLists = ({ Jobs = [], isLoading = true, onSelectedJob }: JobListsProps) => {
  const query = 'Reactjs Developer';
  const queryCountry = 'India';
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  useEffect(() => {
    if (Jobs.length > 0 && selectedJob === null) {
      setSelectedJob(Jobs[0].id);
    }
  }, [Jobs, selectedJob]);

  const handleSelectJob = (jobId: number) => {
    setSelectedJob(jobId);
    onSelectedJob?.(jobId);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header */}
      <div className="z-[2] sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
        <h5 className="text-sm font-bold">
          {query ? `${query} Jobs` : 'Jobs'}{' '}
          <span className="font-normal text-xs">in</span> {queryCountry || 'India'}
        </h5>
        <h5 className="text-xs">{Jobs.length} Results</h5>
      </div>

      {/* Content */}
      <div className="md:hidden">
        {isLoading ? (
          <JobListsSkeleten />
        ) : Jobs.length > 0 ? (
          Jobs.map((job: any) => (
            <div key={job.id} onClick={() => handleSelectJob(job.id)}>
              <BottomDrawer body={<JobDesc job={job} />}>
                <JobList isHover job={job} selectedJob={selectedJob} />
              </BottomDrawer>
            </div>
          ))
        ) : (
          <h4 className="p-3">No Jobs Found</h4>
        )}
      </div>

      <div className="hidden md:block">
        {isLoading ? (
          <JobListsSkeleten />
        ) : Jobs.length > 0 ? (
          Jobs.map((job: any) => (
            <div key={job.id} onClick={() => handleSelectJob(job.id)}>
              <JobList isHover job={job} selectedJob={selectedJob} />
            </div>
          ))
        ) : (
          <h4 className="p-3">No Jobs Found</h4>
        )}
      </div>
    </div>
  );
};

export default JobLists;
