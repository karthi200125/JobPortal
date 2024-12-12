'use client'

import CreateJobForm from '@/app/Forms/CreateJobForm'
import React from 'react'

const page = () => {
    return (
        <div className='w-full min-h-screen py-5 space-y-5'>
            <h2>Create New Job</h2>
            <CreateJobForm />
        </div>
    )
}

export default page