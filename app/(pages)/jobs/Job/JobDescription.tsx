'use client'

import DOMPurify from 'dompurify';
import JobDescriptionSkeleton from '@/Skeletons/JobDescriptionSkeleton';

const JobDescription = ({ job, isPending }: any) => {
  const sanitizedDesc = DOMPurify.sanitize(job?.jobDesc); 

  return (
    <>
      {isPending ? (
        <JobDescriptionSkeleton />
      ) : (
        <div className='w-full p-5 space-y-5'>
          <h3 className='font-bold'>About The Job</h3>
          {/* Render job description as real HTML */}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
        </div>
      )}
    </>
  );
};

export default JobDescription;
