'use client'

import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"

const EasyApply = () => {
    const [step, setStep] = useState(1)

    const handleNextStep = () => setStep(prevStep => prevStep + 1)
    const handlePreviousStep = () => setStep(prevStep => prevStep - 1)

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return "one"
            case 2:
                return "one"
            case 3:
                return "one"
            default:
                return null
        }
    }

    const totalSteps = 4;

    const progress = (1 / totalSteps) * 100;


    return (
        <div className="w-full max-h-max flex items-start flex-col gap-5 ">
            <div className='w-full space-y-3'>
                <h3>1/4 Steps</h3>
                <Progress value={progress} className="w-full" />
            </div>
            <div className="w-full h-full">
                {renderStepContent()}
            </div>
        </div>
    )
}

export default EasyApply