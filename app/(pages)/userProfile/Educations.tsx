'use client'

import { getUserEducation } from '@/actions/user/getUserEducation'
import { UserEducationForm } from '@/app/Forms/UserEducationForm'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { LuPencil } from 'react-icons/lu'
import { CiTrash } from "react-icons/ci";
import DeleteEducationForm from '@/app/Forms/DeleteEducationForm'

const Educations = () => {

    const params = useParams()
    const userId = Number(params?.userId)
    const { data, isPending } = useQuery({
        queryKey: ['getuserEducation', userId],
        queryFn: async () => await getUserEducation(userId),
    });

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border p-5 space-y-5'>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='font-bold'>Education</h3>
                <Model
                    bodyContent={<UserEducationForm />}
                    title='Add you Education'
                    className='w-[1000px]'
                    desc='Add you previus and current education details'
                >
                    <Button variant='border' icon={<GoPlus size={20} />}>Add</Button>
                </Model>
            </div>
            {data?.data?.map((edu) => (
                <div className='relative flex flex-row gap-5 items-start min-h-[100px]' key={edu?.id}>
                    <Image src={''} alt='' width={50} height={50} className='bg-neutral-200' />
                    <div>
                        <h4 className='capitalize font-bold'>{edu?.instituteName}</h4>
                        <h5 className='capitalize'>{edu?.degree} in {edu?.fieldOfStudy}</h5>
                        <h5 className='capitalize text-[var(--lighttext)]'>{edu?.startDate} - {edu?.endDate}</h5>
                        <h5>Grade : {edu?.percentage}%</h5>
                    </div>

                    <div className='absolute top-3 right-3 flex flex-row items-center gap-5'>
                        <Model
                            bodyContent={
                                <UserEducationForm
                                    education={edu}
                                    edit
                                />
                            }
                            title='Edit This Education'
                            className='w-[1000px]'
                            desc='Edit Your education details'
                        >
                            <Icon
                                className=''
                                icon={<LuPencil size={20} />}
                                isHover
                                title='Edit Education'
                            />
                        </Model>
                        <Model
                            bodyContent={<DeleteEducationForm edu={edu} />}
                            title='Delete This Education'
                            className='w-[400px]'
                            desc='Are you Sure Delete Your education'
                        >
                            <Icon                                
                                icon={<CiTrash size={20} />}
                                isHover
                                title='Delete Education'
                            />
                        </Model>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Educations