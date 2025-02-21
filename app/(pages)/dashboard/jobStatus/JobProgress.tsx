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
        <div className="w-full flex justify-between items-center overflow-x-auto">
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className="flex-1 flex flex-col gap-2 items-start text-center"
                >
                    <div className="flex items-center max-w-max">
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
                                className={`max-w-max h-1 ${step.id < currentStep ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </div>

                    {/* Step Title & Date */}
                    <div className="space-y-1">
                        <h4 className="font-bold">{step.title}</h4>
                        <h6 className="text-gray-500">{step.date}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobProgress;
