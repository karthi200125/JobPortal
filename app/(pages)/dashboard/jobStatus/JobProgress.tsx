'use client'

import { AnyARecord } from 'dns';
import { CheckCircleIcon } from 'lucide-react';
import React from 'react';

const JobProgress = ({ currentStep }: any) => {
    const steps = [
        'Applied',
        'Application Viewed',
        'Profile/Resume Viewed',
        'Shortlisted'
    ];

    return (
        <div className="w-full flex justify-between items-center overflow-x-auto">
            {steps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col gap-2 items-start">
                    <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${index <= currentStep ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-300'}`}>
                            {index <= currentStep ? <CheckCircleIcon className="w-4 h-4 text-white" /> : <span className="text-gray-500">{index + 1}</span>}
                        </div>
                        <div className={`w-[140px] flex-1 h-1 ${index < steps.length - 1 ? index < currentStep ? 'bg-green-500' : 'bg-gray-300' : ''}`} />
                    </div>
                    <div className='space-y-1'>
                        <h4 className={`text-center mt-2 font-bold`}>{step}</h4>
                        <h6 className='text-[var(--lighttext)]'>Aug 16 - 24</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobProgress;
