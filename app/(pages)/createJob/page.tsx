'use client'

import CreateJobForm from '@/app/Forms/CreateJobForm'
import Button from '@/components/Button'
import Title from '@/lib/MetaTitle'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const user = useSelector((state: any) => state.user.user)

    const router = useRouter()

    const isRecruiter = user?.role === 'RECRUITER'
    const isOrg = user?.role === 'ORGANIZATION'
    const isCandidate = user?.role === 'CANDIDATE'

    if (isCandidate) {
        redirect('/dashboard')
    }

    const canCreateJob = isRecruiter ? user?.currentCompany : isOrg

    return (
        <div className='w-full min-h-screen py-5 space-y-5'>
            <Title
                title="Create Job | JOBIFY"
                description="Create job Here"
                keywords="job status, application tracking, interview updates, hiring process"
            />
            <h2>Create New Job</h2>

            {isRecruiter && !user?.currentCompany ? (
                <h3 className='text-red-500 text-sm'>
                    You are not yet Verified by your company. Get verification success, then you can create a job.
                </h3>
            ) : canCreateJob ? (
                <div>
                    {user?.isPro ?
                        <Button onClick={() => router.push('/subscription')} className='pro !text-black'>Subscription to create job</Button>
                        :
                        <CreateJobForm />
                    }
                </div>
            ) : (
                <h3 className='text-red-500 text-sm'>
                    You do not have the necessary permissions to create a job.
                </h3>
            )}
        </div>
    )
}

export default Page
