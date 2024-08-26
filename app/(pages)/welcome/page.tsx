'use client'

import CompanyForm from "@/app/Forms/CompanyForm"
import { UserInfoForm } from "@/app/Forms/UserInfoForm"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"
import WelcomeUserExperince from "./WelcomeUserExperince"
import WelcomeUserEducation from "./WelcomeUserEducation"

const Welcome = () => {
    const user = useSelector((state: any) => state.user.user)
    let totalSteps = user?.role === "ORGANIZATION" ? 3 : 2

    const [step, setStep] = useState(4)
    const router = useRouter()

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <UserInfoForm currentStep={step} onNext={(n: number) => setStep(n)} />
            case 2:
                return <WelcomeUserEducation currentStep={step} onNext={(n: number) => setStep(n)} onBack={(n: number) => setStep(n)} />

            // case 3:
            //     return <WelcomeUserExperince currentStep={step} onNext={(n: number) => setStep(n)}  onBack={(n: number) => setStep(n)}/>                                    
            case 3:
                return (
                    <div className={`${user?.role !== 'ORGANIZATION' && "hidden"} w-full h-full space-y-5`}>
                        <h3>Create Company</h3>
                        <CompanyForm />
                    </div>
                )
            default:
                return null
        }
    }

    const checkUserInfo = true

    const HandleBack = () => {
        setStep(prevStep => prevStep - 1)
    }

    return (
        <div className="w-full max-h-max flex items-center justify-start flex-col gap-10 my-5 p-5 border rounded-[20px]">
            <div className="w-full h-full">
                {/* {renderStepContent()} */}
                {/* <div className={`${user?.role !== 'ORGANIZATION' && "hidden"} w-full h-full space-y-5`}> */}
                {/* <h3>Create Company</h3> */}
                <CompanyForm />
                {/* </div> */}
            </div>
            <div className='w-full flex flex-row items-center justify-end gap-5'>
                {/* {step !== 1 &&
                    <Button variant="border" onClick={HandleBack}>Back</Button>
                } */}
                {/* <Button onClick={HandleNext}>{step !== totalSteps ? "Next" : "Complate"}</Button> */}
            </div>
        </div>
    )
}

export default Welcome
