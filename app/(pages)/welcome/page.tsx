'use client'

import { useState } from "react"
import WelcomeUserInfo from "./WelcomeUserInfo"
import WelcomeUserEducation from "./WelcomeUserEducation"
import WelcomeUserExperince from "./WelcomeUserExperince"

const Welcome = () => {
    const [step, setStep] = useState(1)

    const handleNextStep = () => setStep(prevStep => prevStep + 1)
    const handlePreviousStep = () => setStep(prevStep => prevStep - 1)

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <WelcomeUserInfo currentStep={step} onNext={handleNextStep} />
            case 2:
                return <WelcomeUserEducation currentStep={step} onNext={handleNextStep} onBack={handlePreviousStep} />
            case 3:
                return <WelcomeUserExperince currentStep={step} onBack={handlePreviousStep} />
            default:
                return null
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-start flex-col gap-10 py-5">
            <h1>Welcome to the Job Portal</h1>
            <div className="w-full h-full">
                {renderStepContent()}
            </div>
        </div>
    )
}

export default Welcome
