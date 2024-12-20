'use client'

import { CheckCircleIcon } from 'lucide-react';
import moment from 'moment';
import React from 'react';

const JobProgress = ({ jobApplication }: any) => {

    let currentStep = 1

    if (jobApplication?.isApplicationViewed === true) {
        currentStep = 2
    }
    if (jobApplication?.isResumeViewd === true) {
        currentStep = 3
    }
    if (jobApplication?.isSelected === true) {
        currentStep = 4
    }

    const steps = [
        {
            id: 1,
            title: "Applied",
            date: moment(jobApplication?.createdAt).format("MMM D - YYYY")
        },
        {
            id: 2,
            title: "Application Viewed",
            date: moment(jobApplication?.updatedAt).format("MMM D - YYYY")
        },
        {
            id: 3,
            title: "Profile/Resume Viewed",
            date: moment(jobApplication?.updatedAt).format("MMM D - YYYY")
        },
        {
            id: 4,
            title: "Shortlisted",
            date: moment(jobApplication?.updatedAt).format("MMM D - YYYY")
        },
    ];


    return (
        <div className="w-full flex justify-between items-center overflow-x-auto">
            {steps.map((step) => (
                <div className="flex-1 flex flex-col gap-2 items-start" key={step?.id}>
                    <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step?.id <= currentStep ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-300'}`}>
                            {step?.id <= currentStep ? <CheckCircleIcon className="w-4 h-4 text-white" /> : <span className="text-gray-500">{step?.id}</span>}
                        </div>
                        <div className={`w-[140px] flex-1 h-1 ${step?.id < steps.length - 1 ? step?.id < currentStep ? 'bg-green-500' : 'bg-gray-300' : ''}`} />
                    </div>
                    <div className='space-y-1'>
                        <h4 className={`text-center mt-2 font-bold`}>{step?.title}</h4>
                        <h6 className='text-[var(--lighttext)]'>{step?.date}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobProgress;
