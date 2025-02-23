"use client";

import { CheckCircleIcon } from "lucide-react";
import moment from "moment";
import React from "react";

interface JobApplication {
    createdAt: any;
    ApplicationViewedUpdatedAt?: any
    SelectedUpdatedAt?: any
    isApplicationViewed: boolean;
    isSelected: boolean;
}

interface JobProgressProps {
    jobApplication: JobApplication;
}

const JobProgress: React.FC<JobProgressProps> = ({ jobApplication }) => {
    let currentStep = 1;

    if (jobApplication?.isApplicationViewed) {
        currentStep = 2;
    }
    if (jobApplication?.isSelected) {
        currentStep = 3;
    }

    const steps = [
        {
            id: 1,
            title: "Applied",
            date: moment(jobApplication?.createdAt).format("MMM D, YYYY"),
        },
        {
            id: 2,
            title: "Profile/Resume Viewed",
            date: jobApplication?.ApplicationViewedUpdatedAt
                ? moment(jobApplication?.ApplicationViewedUpdatedAt).format("MMM D, YYYY")
                : "Pending",
        },
        {
            id: 3,
            title: "Shortlisted",
            date: jobApplication?.SelectedUpdatedAt
                ? moment(jobApplication?.SelectedUpdatedAt).format("MMM D, YYYY")
                : "Pending",
        },
    ];

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center overflow-x-auto gap-5 md:gap-0">
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className="w-full md:flex-1 flex flex-row md:flex-col gap-5 md:gap-2 items-start text-center"
                >
                    <div className="min-w-[30px] md:w-full flex flex-col md:flex-row items-start md:items-center">
                        {/* Step Circle */}
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step.id <= currentStep
                                ? "bg-green-500 border-green-500"
                                : "bg-gray-200 border-gray-300"
                                }`}
                        >
                            {step.id <= currentStep ? (
                                <CheckCircleIcon className="w-4 h-4 text-white" />
                            ) : (
                                <span className="text-gray-500">{step.id}</span>
                            )}
                        </div>

                        {/* Progress Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`hidden md:block w-full h-1 ${step.id < currentStep ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </div>

                    {/* Step Title & Date */}
                    <div className="space-y-1 text-start">
                        <h4 className="font-bold">{step.title}</h4>
                        <h6 className="text-gray-500">{step.date}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobProgress;
