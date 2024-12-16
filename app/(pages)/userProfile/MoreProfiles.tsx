'use client'

import { moreProfileUsers } from '@/actions/moreProfileUsers'
import Batch from '@/components/Batch'
import Button from '@/components/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { memo, useTransition } from 'react'
import { GoPlus } from 'react-icons/go'
import { IoMdSend } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import noAvatar from '../../../public/noProfile.webp'
import MoreProfileSkeleton from '@/Skeletons/MoreProfileSkeleton'
import Link from 'next/link'
import { UserFollowAction } from '@/actions/user/UserFollowAction'
import { userFollow } from '@/app/Redux/AuthSlice'

interface profileUserProps {
    profileUser?: any
    userId?: any
}

const MoreProfiles = ({ profileUser, userId }: profileUserProps) => {

    const user = useSelector((state: any) => state.user.user)    
    const dispatch = useDispatch()

    const currentUser = user?.id === userId
    const id = currentUser ? user?.id : userId
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ['getMoreProfiles', id, currentUser, user?.id],
        queryFn: async () => moreProfileUsers(id, currentUser, user?.id),
    });

    const isFollowings = user?.followings.includes(profileUser?.id)

    const HandleFollow = () => {
        startTransition(() => {
            const currentUserId = user?.id
            const userId = profileUser?.id
            UserFollowAction(currentUserId, userId)
                .then((data: any) => {
                    if (data?.success) {
                        dispatch(userFollow(userId))
                        queryClient.invalidateQueries({ queryKey: ['getuser', profileUser?.id] })
                    }
                    if (data?.error) {
                        console.log(data?.error)
                    }
                })
        })
    }

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
                                    <Link href={`/userProfile/${moreuser?.id}`} className='font-bold cursor-pointer trans'>{moreuser?.username}</Link>
                                    {moreuser?.isPro &&
                                        <Batch type='premium' />
                                    }
                                </div>
                                <h5>{moreuser?.profession} </h5>
                                <div className='flex flex-row items-center gap-3'>
                                    <Button variant='border' isLoading={isPending} className={`${isFollowings && "!bg-[var(--voilet)] text-white"} !h-[30px]`} onClick={HandleFollow} icon={!isFollowings && <GoPlus size={20} />}>
                                        {!isFollowings ? "Follow" : "Unfollow"}
                                    </Button>
                                    {/* <Button variant='border' icon={<GoPlus size={20} />} className={'!h-[30px]'}>Follow</Button> */}
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