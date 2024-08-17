'use client'

import Button from "@/components/Button"
import { useState } from "react"

const WelcomeUserEducation = ({ CurrentStep, onNext }: any) => {

    const [step, setStep] = useState(CurrentStep)

    const HandleClick = (type: string) => {
        setStep(type === 'next' ? step + 1 : step - 1)
        onNext(step)
    }

    return (
        <div className='w-full h-full p-5 border rounded-[20px]'>
            <h3>You Education</h3>            
            <div className='flex flex-row items-center justify-end gap-5'>
                <Button variant='border' onClick={() => HandleClick('prev')}>previous</Button>
                <Button onClick={() => HandleClick('next')}>Continue</Button>
            </div>
        </div>
    )
}

export default WelcomeUserEducation