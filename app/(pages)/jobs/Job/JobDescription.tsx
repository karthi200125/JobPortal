'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import JobDescriptionSkeleton from '@/Skeletons/JobDescriptionSkeleton';

const JobDescription = ({ job, isPending }: any) => {
  const [sanitizedDesc, setSanitizedDesc] = useState('');

  useEffect(() => {
    if (job?.jobDesc) {
      setSanitizedDesc(DOMPurify.sanitize(job.jobDesc));
    }
  }, [job]);

  return (
    <>
      {isPending ? (
        <JobDescriptionSkeleton />
      ) : (
        <div className="w-full p-5 space-y-5">
          <h3 className="font-bold">About The Job</h3>
          <div className="prose max-w-none text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
        </div>
      )}
    </>
  );
};

export default JobDescription;
