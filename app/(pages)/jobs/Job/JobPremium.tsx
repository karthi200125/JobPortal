import Button from '@/components/Button'
import React from 'react'

const JobPremium = () => {
    return (
        <div className='w-full border rounded-[10px] max-h-max space-y-2 p-3'>
            <h4 className='font-semibold'>Achieve your goals faster with Premium</h4>
            <h5>Get exclusive access to applicant insights, see jobs where youd be a top applicant and more</h5>
            <Button className='!bg-yellow-200 text-black'>Activate Premium</Button>
            <h6 className='text-[var(--lighttext)]'>Cancel anytime, for any reason.</h6>
        </div>
    )
}

export default JobPremium