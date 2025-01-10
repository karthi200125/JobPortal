'use client'

import CompanyForm from "@/app/Forms/CompanyForm"
import { UserInfoForm } from "@/app/Forms/UserInfoForm"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"
import WelcomeUserExperince from "./WelcomeUserExperince"
import WelcomeUserEducation from "./WelcomeUserEducation"
import Button from "@/components/Button"

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
                return <WelcomeUserExperince currentStep={step} onNext={(n: number) => setStep(n)} onBack={(n: number) => setStep(n)} />
            default:
                return null
        }
    }

    const HandleBack = () => {
        setStep(prevStep => prevStep - 1)
    }

    return (
        <div className="w-full max-h-max flex items-center justify-start flex-col gap-10 my-5 p-5 border rounded-[20px]">
            <div className="w-full h-full">
                {isOrg ?
                    <div className={`${user?.role !== 'ORGANIZATION' && "hidden"} w-full h-full space-y-5`}>
                        <h3 className="font-bold">Create Company</h3>
                        <CompanyForm />
                    </div>
                    :
                    renderStepContent()}
            </div>
            {/* <div className='w-full flex flex-row items-center justify-end gap-5'>
                {isOrg ?
                    ""
                    :
                    step !== 1 &&
                    <Button variant="border" onClick={HandleBack}>Back</Button>
                }
            </div> */}
        </div>
    )
}

export default Welcome
