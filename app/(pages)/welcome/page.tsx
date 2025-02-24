'use client'

import CompanyForm from "@/app/Forms/CompanyForm"
import { UserInfoForm } from "@/app/Forms/UserInfoForm"
import Title from "@/lib/MetaTitle"
import { useState } from "react"
import { useSelector } from "react-redux"
import WelcomeUserEducation from "./WelcomeUserEducation"
import WelcomeUserExperince from "./WelcomeUserExperince"

const Welcome = () => {
    const user = useSelector((state: any) => state.user.user)
    const [step, setStep] = useState(1)

    const isOrg = user?.role === "ORGANIZATION"

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <UserInfoForm currentStep={step} onNext={(n: number) => setStep(n)} />
            case 2:
                return <WelcomeUserEducation currentStep={step} onNext={(n: number) => setStep(n)} onBack={(n: number) => setStep(n)} />
            case 3:
                return <WelcomeUserExperince currentStep={step} onBack={(n: number) => setStep(n)} />
            default:
                return null
        }
    }

    return (
        <div className="w-full max-h-max flex items-center justify-start flex-col gap-10 my-5 p-5 border rounded-[20px]">
            <Title
                title="Welcome to JOBIFY!"
                description="Start your job search journey with JOBIFY. Explore jobs, connect with recruiters, and land your dream job."
                keywords="welcome, job seeker, job portal, new user, career start"
            />

            <div className="w-full h-full">
                {isOrg ?
                    <div className={`${user?.role !== 'ORGANIZATION' && "hidden"} w-full h-full space-y-5`}>
                        <h3 className="font-bold">Create Company</h3>
                        <CompanyForm />
                    </div>
                    :
                    renderStepContent()}
            </div>
        </div>
    )
}

export default Welcome
