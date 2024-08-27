'use client'

import { getUserById } from '@/actions/auth/getUserById'
import { VscLinkExternal } from "react-icons/vsc";
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useTransition } from 'react'
import { GoPlus } from "react-icons/go";
import { IoMdSend } from 'react-icons/io'
import { LuPencil } from "react-icons/lu";
import { UserInfoForm } from '@/app/Forms/UserInfoForm';
import UserInfoSkeleton from '@/Skeletons/UserInfoSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { UserFollowAction } from '@/actions/user/UserFollowAction';
import { userFollow } from '@/app/Redux/AuthSlice';

interface ProfileUserProps {
    profileUser?: any
    isLoading?: boolean
}

const UserInfo = ({ profileUser, isLoading }: ProfileUserProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()
    const [isPending, startTransition] = useTransition()

    const isFollowings = user?.followings.includes(profileUser?.id)
    // UserFollowAction

    const HandleFollow = () => {
        startTransition(() => {
            const currentUserId = user?.id
            const userId = profileUser?.id
            UserFollowAction(userId, currentUserId)
                .then((data: any) => {
                    console.log(data)
                    if (data?.success) {
                        dispatch(userFollow(userId))
                    }
                    if (data?.error) {
                        console.log(data?.error)
                    }
                })
        })
    }

    return (
        <div className=' relative w-full min-h-[200px] overflow-hidden rounded-[20px] border '>

            {/* image container */}
            <div className='absolute top-0 left-0 w-full h-[200px]'>
                <Image src={''} alt='' width={100} height={200} className='bg-neutral-200 w-full h-full' />
                <Image src={''} alt='' width={150} height={150} className='bg-red-400 w-[150px] h-[150px] absolute bottom-[-40px] left-5 rounded-full border-[4px] border-solid border-[var(--white)]' />
                <Model
                    bodyContent={'body'}
                    title='Edit Profile'
                    className='w-[800px]'
                    triggerCls='absolute top-3 right-3'
                >
                    <Icon
                        className=''
                        icon={<LuPencil size={20} />}
                        isHover
                        title='Edit Profile'
                    />
                </Model>
            </div>

            {isLoading ?
                < UserInfoSkeleton />
                :
                <div className='relative mt-[250px] w-full max-h-max p-5 space-y-2'>
                    <h2 className='font-bold capitalize'>{profileUser?.username}</h2>
                    <h3 className='w-[70%] text-lg text-[var(--lighttext)]'>{profileUser?.userBio}</h3>
                    <h4 className='capitalize'>{profileUser?.city}, {profileUser?.state}, {profileUser?.country} </h4>
                    <div className="flex flex-row items-center gap-2 text-[var(--voilet)] hover:underline trans">
                        <a href={profileUser?.website || ""} className='font-bold'>Personal Website</a>
                        <VscLinkExternal size={15} />
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <h4 className='bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5'><b className='font-bold'>100</b> Followers</h4>
                        <h4 className='bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5'><b className='font-bold'>200</b> Followings</h4>
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <Button variant='border' isLoading={isPending} onClick={HandleFollow} icon={<GoPlus size={20} />}>
                            {isFollowings ? "Follow" : "Un Follow"}
                        </Button>
                        <Button variant='border' icon={<IoMdSend size={20} />}>Message</Button>
                    </div>
                    <Model
                        bodyContent={<UserInfoForm />}
                        title='Edit Profile'
                        className='w-[800px]'
                        triggerCls='absolute top-3 right-3'
                    >
                        <Icon
                            className=''
                            icon={<LuPencil size={20} />}
                            isHover
                            title='Edit Profile'
                        />
                    </Model>
                </div>
            }

        </div>
    )
}

export default UserInfo