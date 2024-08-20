'use client'

import Image from 'next/image'
import React from 'react'

const EasyApplySubmit = () => {
    return (
        <div className='w-full p-5 rounded-md border space-y-5'>

            <div>
                <h3 className='font-bold'>Review your application</h3>
                <h6 className='text-[var(--lighttext)]'>The employer will also receive a copy of your profile.</h6>
            </div>

            <div className='space-y-5'>

                {/* user info */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Contact Info</h3>
                    <div className="w-full border p-5 rounded-md flex flex-row items-start gap-5">
                        <Image src={''} alt="" height={80} width={80} className="rounded-md bg-neutral-200" />
                        <div className="w-full flex flex-row items-start justify-between">
                            <div className="space-y-2">
                                <h4 className="font-bold">karthikeyan</h4>
                                <h5>Software Developer</h5>
                                <h5 className="text-[var(--lighttext)]">slame , tamilnadu , india</h5>
                            </div>
                            <div className='space-y-2'>
                                <div>
                                    <h6 className='text-[var(--lighttext)]'>Email Address *</h6>
                                    <h4>test@gamil.com</h4>
                                </div>
                                <div>
                                    <h6 className='text-[var(--lighttext)]'>Phone Number *</h6>
                                    <h4>123456890</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* resume */}
                <div className='space-y-2'>
                    <h3 className="font-semibold text-sm">Resume</h3>
                    <h6 className='text-[var(--lighttext)]'>Be sure to include an updated resume *</h6>
                    <div className='border rounded-md p-5'>
                        resume name
                    </div>
                </div>

                {/*Additional Questions */}
                <div className='space-y-2'>
                    <h3 className="font-semibold text-sm">Additional Questions</h3>
                    <h6 className='text-[var(--lighttext)]'>Be sure to include an updated resume *</h6>
                    <div className='space-y-2 border rounded-md p-5'>
                        <div>
                            <h6 className='text-[var(--lighttext)]'>Have you completed the following level of education: Bachelor's Degree?</h6>
                            <h4>Yes</h4>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EasyApplySubmit