'use client'

import CreateJobForm from '@/app/Forms/CreateJobForm'
import React from 'react'

export const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
]


const page = () => {



    return (
        <div className='w-full min-h-screen py-5 space-y-5'>
            <h2>Create New Job</h2>
            <CreateJobForm />
        </div>
    )
}

export default page