
import { UserInfoForm } from '@/app/Forms/UserInfoForm'
import Button from '@/components/Button'
import React, { useState } from 'react'

const WelcomeUserInfo = ({ CurrentStep, onNext }: any) => {

    const [step, setStep] = useState(CurrentStep)

    const HandleClick = () => {
        setStep(step + 1)
        onNext(step)
    }

    return (
        <div className='w-full max-h-max p-5 border rounded-[20px] space-y-10'>
            <UserInfoForm />

            <div className='flex flex-row items-center justify-end gap-5'>
                <Button onClick={HandleClick}>Continue</Button>
            </div>
        </div>
    )
}

export default WelcomeUserInfo