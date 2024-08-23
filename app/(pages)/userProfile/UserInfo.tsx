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
import React from 'react'
import { GoPlus } from "react-icons/go";
import { IoMdSend } from 'react-icons/io'
import { LuPencil } from "react-icons/lu";
import { UserInfoForm } from '@/app/Forms/UserInfoForm';

const UserInfo = () => {

    const { userId } = useParams()
    const id = Number(userId)

    const { data, isPending } = useQuery({
        queryKey: ['getuser', id],
        queryFn: async () => await getUserById(id),
    });

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

            <div className='relative mt-[250px] w-full max-h-max p-5 space-y-2'>
                <h2 className='font-bold capitalize'>{data?.username}</h2>
                <h3 className='w-[70%] text-lg text-[var(--lighttext)]'>{data?.userBio}</h3>
                <h4 className='capitalize'>{data?.city}, {data?.state}, {data?.country} </h4>
                <div className="flex flex-row items-center gap-2 text-[var(--voilet)] hover:underline trans">
                    <a href={data?.website || ""} className='font-bold'>Personal Website</a>
                    <VscLinkExternal size={15} />
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <h4>100 Followers</h4>
                    <h4>200 Followings</h4>
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <Button variant='border' icon={<GoPlus size={20} />}>Follow</Button>
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

        </div>
    )
}

export default UserInfo