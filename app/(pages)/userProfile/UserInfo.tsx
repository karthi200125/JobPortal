'use client'

import { getUserById } from '@/actions/auth/getUserById'
import { VscLinkExternal } from "react-icons/vsc";
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import noProfile from '../../../public/noProfile.webp'

interface ProfileUserProps {
    profileUser?: any
    isLoading?: boolean
    isOrg?: boolean
    company?: any
}

const UserInfo = ({ profileUser, isLoading, isOrg, company }: ProfileUserProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient();

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

    const isCurrentUser = user?.id === profileUser?.id

    return (
        <div className=' relative w-full min-h-[200px] overflow-hidden rounded-[20px] border '>

            {/* image container */}
            <div className='absolute top-0 left-0 w-full h-[200px]'>
                <Image src={profileUser?.profileImage || ''} alt='' width={100} height={200} className='bg-neutral-200 w-full h-full' />
                <Image src={isOrg ? company?.companyImage : profileUser?.userImage || noProfile.src} alt='' width={150} height={150} className='w-[150px] h-[150px] absolute bottom-[-40px] left-5 rounded-full border-[4px] border-solid border-[var(--white)]' />
                {/* {isCurrentUser &&
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
                } */}
            </div>

            {isLoading ?
                < UserInfoSkeleton />
                :
                <div className='relative mt-[250px] w-full max-h-max p-5 space-y-2'>
                    <h2 className='font-bold capitalize'>{isOrg ? company?.companyName : profileUser?.username}</h2>
                    <h3 className='w-[70%] text-lg text-[var(--lighttext)]'>{isOrg ? company?.companyName : profileUser?.userBio}</h3>
                    <h4 className='capitalize'>{isOrg ? company?.companyCity : profileUser?.city}, {isOrg ? company?.companyState : profileUser?.state}, {isOrg ? company?.companyCountry : profileUser?.country} </h4>
                    <div className="flex flex-row items-center gap-2 text-[var(--voilet)] hover:underline trans">
                        <a href={isOrg ? company?.companuWebsite : profileUser?.website || ""} className='font-bold'>Personal Website</a>
                        <VscLinkExternal size={15} />
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <h4 className='bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5'><b className='font-bold'>
                            {profileUser?.followers?.length || 0}
                        </b> Followers</h4>
                        <h4 className='bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5'><b className='font-bold'>
                            {profileUser?.followings?.length || 0}
                        </b> Followings</h4>
                    </div>
                    {!isCurrentUser &&
                        <div className='flex flex-row items-center gap-5 mt-5'>
                            <Button variant='border' isLoading={isPending} className={`${isFollowings && "!bg-[var(--voilet)] text-white"}`} onClick={HandleFollow} icon={!isFollowings && <GoPlus size={20} />}>
                                {!isFollowings ? "Follow" : "Unfollow"}
                            </Button>
                            <Button variant='border' icon={<IoMdSend size={20} />}>Message</Button>
                        </div>
                    }

                    {isCurrentUser &&
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
                    }
                </div>
            }

        </div>
    )
}

export default UserInfo