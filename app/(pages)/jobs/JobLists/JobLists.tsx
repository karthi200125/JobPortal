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

const JobLists: React.FC<JobListsProps> = ({ Jobs, isLoading }) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header */}
      <div className="z-10 sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
        <h5 className="text-sm font-bold">
          React js Developer <span className="font-normal text-xs">in</span> India
        </h5>
        <h5 className="text-xs">100 Results</h5>
      </div>

      {/* Content */}
      <div className="md:hidden">
        <BottomDrawer body={<JobDesc />}>
          <JobList isHover />
        </BottomDrawer>
      </div>

      <div className="hidden md:block">
        {isLoading ?
          <JobListsSkeleten />
          : Jobs && Jobs.length > 0 ?
            Jobs.map((job: any) => (
              <JobList key={job.id} isHover job={job} />
            ))
            :
            <h4>No Jobs Found</h4>
        }
      </div>
    </div>
  );
}

export default JobLists;
