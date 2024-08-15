import Batch from '@/components/Batch'
import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'

const MoreProfiles = () => {
    return (
        <div className='w-full min-h-[200px] overflow-hidden rounded-[20px] border space-y-3 p-5'>
            <h3 className='font-bold'>More Profiles</h3>

            <div className='flex flex-row items-start gap-5 borderb py-5'>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200 rounded-full' />
                <div className='space-y-2'>
                    <div className='flex flex-row items-center gap-3'>
                        <h4 className='font-bold'>Karthikeyan</h4>
                        <Batch type='premium' />
                    </div>
                    <h5>softeard developer</h5>
                    <div className='flex flex-row items-center gap-3'>
                        <Button variant='border' className={'!h-[30px]'}>Follow</Button>
                        <Button variant='border' className={'!h-[30px]'}>Message</Button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-start gap-5 borderb py-5'>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200 rounded-full' />
                <div className='space-y-2'>
                    <h4 className='font-bold'>Karthikeyan</h4>
                    <h5>softeard developer</h5>
                    <div className='flex flex-row items-center gap-3'>
                        <Button variant='border' className={'!h-[30px]'}>Follow</Button>
                        <Button variant='border' className={'!h-[30px]'}>Message</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MoreProfiles