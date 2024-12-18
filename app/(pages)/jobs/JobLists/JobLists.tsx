'use client'

import BottomDrawer from "@/components/BottomDrawer";
import JobListsSkeleten from "@/Skeletons/JobListsSkeleten";
import React from 'react';
import JobDesc from "../Job/Job";
import JobList from "./JobList";

interface JobListsProps {
  Jobs?: any;
  isLoading?: boolean;
}

const JobLists = ({ Jobs, isLoading }: JobListsProps) => {

  const query = 'Reactjs Developer'
  const queryCountry = 'India'

  const isActive = true

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header */}
      <div className="z-[2] sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
        <h5 className="text-sm font-bold">
          {query ? `${query} Jobs` : 'Jobs'}  <span className="font-normal text-xs">in</span> {queryCountry || 'India'}
        </h5>
        <h5 className="text-xs">{Jobs.length || 0} Results</h5>
      </div>

      {/* Content */}
      <div className="md:hidden">
        {isLoading ?
          <JobListsSkeleten />
          : Jobs && Jobs?.length > 0 ?
            Jobs?.map((job: any) => (
              <BottomDrawer key={job.id} body={<JobDesc />}>
                <JobList isHover job={job} isActive={isActive} />
              </BottomDrawer>
            ))
            :
            <h4 className="p-3">No Jobs Found</h4>
        }
      </div>

      <div className="hidden md:block">
        {isLoading ?
          <JobListsSkeleten />
          : Jobs && Jobs.length > 0 ?
            Jobs.map((job: any) => (
              <JobList key={job.id} isHover job={job} isActive={isActive} />
            ))
            :
            <h4>No Jobs Found</h4>
        }
      </div>
    </div>
  );
}

export default JobLists;
