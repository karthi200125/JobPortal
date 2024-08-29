'use client'

import { moreProfileUsers } from '@/actions/moreProfileUsers'
import Batch from '@/components/Batch'
import Button from '@/components/Button'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'

const MoreProfiles = () => {

    const user = useSelector((state: any) => state.user.user)
    const { userId } = useParams()

    const currentUser = user?.id === userId

    const { data, isLoading } = useQuery({
        queryKey: ['getMoreProfiles', userId, currentUser],
        queryFn: async () => moreProfileUsers(userId, currentUser),
    });

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
                        <Button variant='border' icon={<GoPlus size={20} />} className={'!h-[30px]'}>Follow</Button>
                        <Button variant='border' icon={<IoMdSend size={15} />} className={'!h-[30px]'}>Message</Button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-start gap-5 borderb py-5'>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200 rounded-full' />
                <div className='space-y-2'>
                    <div className='flex flex-row items-center gap-3'>
                        <h4 className='font-bold'>Karthikeyan</h4>
                        <Batch type='premium' />
                    </div>
                    <h5>softeard developer</h5>
                    <div className='flex flex-row items-center gap-3'>
                        <Button variant='border' icon={<GoPlus size={20} />} className={'!h-[30px]'}>Follow</Button>
                        <Button variant='border' icon={<IoMdSend size={15} />} className={'!h-[30px]'}>Message</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MoreProfiles