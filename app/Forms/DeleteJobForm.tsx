import Button from '@/components/Button'
import React from 'react'
import JobList from '../(pages)/jobs/JobLists/JobList'

const DeleteJobForm = () => {
  return (
    <div className="space-y-5">
      <JobList />
      <Button className='w-full'>Delete Job</Button>
    </div>
  )
}

export default DeleteJobForm