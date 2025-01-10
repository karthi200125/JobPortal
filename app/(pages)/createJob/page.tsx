'use client'

import CreateJobForm from '@/app/Forms/CreateJobForm'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const user = useSelector((state: any) => state.user.user)

    const isRecruiter = user?.role === 'RECRUITER'
    const isOrg = user?.role === 'ORGANIZATION'

    const canCreateJob = isRecruiter ? user?.currentCompany : isOrg

    return (
        <div className='w-full min-h-screen py-5 space-y-5'>
            <h2>Create New Job</h2>

            {isRecruiter && !user?.currentCompany ? (
                <h3 className='text-red-500 text-sm'>
                    You are not yet Verified by your company. Get verification success, then you can create a job.
                </h3>
            ) : canCreateJob ? (
                <CreateJobForm />
            ) : (
                <h3 className='text-red-500 text-sm'>
                    You do not have the necessary permissions to create a job.
                </h3>
            )}
        </div>
    )
}

export default Page
