import React from 'react'

const JobDescription = ({ job }: any) => {
  return (
    <div className='w-full p-5 space-y-5'>
      <h3 className='font-bold'>About The Job</h3>

      <p>{job?.desc}</p>
    </div>
  )
}

export default JobDescription