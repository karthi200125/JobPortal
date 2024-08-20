'use client'

import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import EasyApplyUserInfo from './EasyApplyUserInfo'
import EasyApplyResume from './EasyApplyResume'
import Button from '@/components/Button'
import EasyApplyQuestions from './EasyApplyQuestions'
import EasyApplySubmit from './EasyApplySubmit'

const EasyApply = () => {
    const [step, setStep] = useState(0)


    const handleNextStep = () => setStep(prevStep => prevStep + 1)
    const handlePreviousStep = () => setStep(prevStep => prevStep - 1)

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return <EasyApplyUserInfo />
            case 1:
                return <EasyApplyResume />
            case 2:
                return <EasyApplyQuestions />
            case 3:
                return <EasyApplySubmit />
            default:
                return null
        }
    }

    const SubmitApplication = () => {
        console.log("submit")
    }

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    return (
        <div className="w-full max-h-max flex items-start flex-col">

            <div className='sticky top-[60px] left-0 w-full flex flex-row items-center gap-5 bg-white py-3'>
                <Progress value={progress} className="w-full" />
                <h3 className='max-w-max px-2 whitespace-nowrap font-bold'>{progress} %</h3>
            </div>

            <div className="w-full h-full mt-5">
                {renderStepContent()}
            </div>


            <div className='mt-5 w-full flex flex-row items-center justify-between gap-5 border rounded-md p-5'>
                <h6>Submitting this application won’t change your LinkedIn profile.</h6>
                <div className='flex flex-row items-center gap-5'>
                    {step !== 0 &&
                        <Button variant='border' onClick={handlePreviousStep}>Previous</Button>
                    }
                    <Button onClick={step === 3 ? SubmitApplication : handleNextStep}>{step === 3 ? "Submit Application" : "Next"}</Button>
                </div>
            </div>

        </div>
    )
}

export default EasyApply