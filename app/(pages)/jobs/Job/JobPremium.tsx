import Button from '@/components/Button'
import React from 'react'

const JobPremium = () => {
    return (
        <div className='w-full border rounded-[10px] max-h-max space-y-2 p-5'>
            <h3 className='font-bold'>Achieve your goals faster with Premium</h3>
            <h5 className='text-[var(--lighttext)]'>Get exclusive access to applicant insights, see jobs where youd be a top applicant and more</h5>
            <Button className='pro !text-black'>Activate Premium</Button>
            <h6 className='text-[var(--lighttext)]'>Cancel anytime, for any reason.</h6>
        </div>
    )
}

export default JobPremium