import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'

const JobRecruiter = () => {
    return (
        <div className='relative w-full border rounded-[10px] min-h-[100px] p-3 space-y-3'>
            <h3 className='font-bold'>Meet The Hiring Team</h3>
            <div className='flex flex-row items-start gap-5'>
                <Image width={50} height={50} src={''} alt='Recruiter Image' className='bg-neutral-200 rounded-full' />
                <div className='space-y-1'>
                    <h4 className='font-bold'>Karthi keyan</h4>
                    <h5>Sofeware develeopr At HCL technolgies</h5>
                    <h5>Technical recruiting</h5>
                    <h6 className='text-[var(--lighttext)]'>Job poster</h6>
                </div>
                <Button className='absolute top-3 right-3' variant='border'>Message</Button>
            </div>
        </div>
    )
}

export default JobRecruiter