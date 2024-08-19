'use client'

import { UserExperienceForm } from "@/app/Forms/UserExperienceForm"
import Button from "@/components/Button"
import Model from "@/components/Model/Model"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

const WelcomeUserExperince = ({ CurrentStep, onNext }: any) => {

    const [step, setStep] = useState(CurrentStep)

    const HandleClick = (type: string) => {
        setStep(type === 'next' ? step + 1 : step - 1)
        onNext(step)
    }

    const [exp, setExp] = useState("fresher")

    console.log(exp)

    return (
        <div className='w-full h-full p-5 border rounded-[20px] space-y-5'>
            <h3>You Experince</h3>

            {/* <div>
                <h3>Select Your Expereince Level</h3>
                <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-row items-center gap-3">
                        <input type="checkbox" value={exp} name="fresher" onChange={(e) => setExp("fresher")} />
                        <h4>Frehser</h4>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <input type="checkbox" value={exp} name="experinced" onChange={(e) => setExp("experinced")} />
                        <h4>Experinced</h4>
                    </div>
                </div>
            </div> */}

            <Model
                bodyContent={<UserExperienceForm />}
                title="Experience"
                desc="Add you Experience details"
                className="w-full md:w-[1000px]"
            >
                <Button variant="border" icon={<FaPlus size={20} />}>Add Experience</Button>
            </Model>

            <div className='flex flex-row items-center justify-start gap-5'>
                <Button variant='border' onClick={() => HandleClick('prev')}>previous</Button>
                <Button onClick={() => HandleClick('next')}>Continue</Button>
            </div>

        </div>
    )
}

export default WelcomeUserExperince