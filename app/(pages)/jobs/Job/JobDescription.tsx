'use client'

import JobDescriptionSkeleton from '@/Skeletons/JobDescriptionSkeleton'

const JobDescription = ({ job, isPending }: any) => {
  return (
    <>
      {isPending ?
        <JobDescriptionSkeleton />
        :
        <div className='w-full p-5 space-y-5'>
          <h3 className='font-bold'>About The Job</h3>
          <h4>{job?.jobDesc}</h4>
        </div>
      }
    </>
  )
}

export default JobDescription