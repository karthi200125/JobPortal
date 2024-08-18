'use client'

import { UserEducationForm } from "@/app/Forms/UserEducationForm"
import Button from "@/components/Button"
import Model from "@/components/Model"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";

const WelcomeUserEducation = ({ CurrentStep, onNext }: any) => {

    const [step, setStep] = useState(CurrentStep)

    const HandleClick = (type: string) => {
        setStep(type === 'next' ? step + 1 : step - 1)
        onNext(step)
    }

    return (
        <div className='w-full h-full p-5 border rounded-[20px] space-y-5'>
            <h3>You Education</h3>
            <Model
                bodyContent={<UserEducationForm />}
                title="Education"
                desc="Add you education details"
                className="w-full md:w-[1000px]"
            >
                <Button variant="border" icon={<FaPlus size={20} />}>Add</Button>
            </Model>
            <div className='flex flex-row items-center justify-end gap-5'>
                <Button variant='border' onClick={() => HandleClick('prev')}>previous</Button>
                <Button onClick={() => HandleClick('next')}>Continue</Button>
            </div>
        </div>
    )
}

export default WelcomeUserEducation