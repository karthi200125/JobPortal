'use client'

import { moreProfileUsers } from '@/actions/moreProfileUsers'
import Batch from '@/components/Batch'
import Button from '@/components/Button'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { memo } from 'react'
import { GoPlus } from 'react-icons/go'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'
import noAvatar from '../../../public/noProfile.webp'
import MoreProfileSkeleton from '@/Skeletons/MoreProfileSkeleton'

interface profileUserProps {
    profileUser?: any
    userId?: any
}

const MoreProfiles = ({ profileUser, userId }: profileUserProps) => {

    const user = useSelector((state: any) => state.user.user)

    const currentUser = user?.id === userId
    const id = currentUser ? user?.id : userId

    const { data = [], isLoading } = useQuery({
        queryKey: ['getMoreProfiles', id, currentUser, user?.id],
        queryFn: async () => moreProfileUsers(id, currentUser, user?.id),
    });

    return (
        <div className='w-full min-h-[200px] overflow-hidden rounded-[20px] border space-y-3 p-5'>
            <h3 className='font-bold'>{currentUser ? "More Profiles" : "Profile Followers"}</h3>
            {isLoading ?
                <MoreProfileSkeleton />
                :
                data?.length > 0 ?
                    data?.map((moreuser) => (
                        <div key={moreuser?.id} className='flex flex-row items-start gap-5 borderb py-5'>
                            <Image src={moreuser?.userImage || noAvatar.src} alt='' width={50} height={50} className='bg-neutral-200 rounded-full' />
                            <div className='space-y-2'>
                                <div className='flex flex-row items-center gap-3'>
                                    <h4 className='font-bold'>{moreuser?.username}</h4>
                                    {moreuser?.isPro &&
                                        <Batch type='premium' />
                                    }
                                </div>
                                <h5>{moreuser?.profession} </h5>
                                <div className='flex flex-row items-center gap-3'>
                                    <Button variant='border' icon={<GoPlus size={20} />} className={'!h-[30px]'}>Follow</Button>
                                    <Button variant='border' icon={<IoMdSend size={15} />} className={'!h-[30px]'}>Message</Button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <h4 className="text-[var(--lighttext)]">No Profiles</h4>
            }
        </div>
    )
}

export default memo(MoreProfiles)