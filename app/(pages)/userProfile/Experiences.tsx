'use client'

import { getUserEducation } from '@/actions/user/getUserEducation'
import DeleteEducationForm from '@/app/Forms/DeleteEducationForm'
import { UserExperienceForm } from '@/app/Forms/UserExperienceForm'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import ExperiencesSkeleton from '@/Skeletons/ExperiencesSkeleton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { CiTrash } from "react-icons/ci"
import { GoPlus } from 'react-icons/go'
import { LuPencil } from 'react-icons/lu'
import { useSelector } from 'react-redux'

interface ExperiencesProps {
    userId?: any,
    profileUser?: any,
}

const Experiences = ({ userId, profileUser }: ExperiencesProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const { data, isPending } = useQuery({
        queryKey: ['getuserEducation', userId],
        queryFn: async () => await getUserEducation(userId),
    });

    const isCurrentUser = user?.id === profileUser?.id

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border p-5 space-y-5'>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='font-bold'>Experiences</h3>
                {isCurrentUser &&
                    <Model
                        bodyContent={<UserExperienceForm />}
                        title='Add you Experience'
                        className='w-[1000px]'
                        desc='Add you previus and current Experience details'
                    >
                        <Button variant='border' icon={<GoPlus size={20} />}>Add</Button>
                    </Model>
                }
            </div>

            {isPending ?
                <ExperiencesSkeleton />
                :
                data?.data?.map((exp) => (
                    <div className='relative flex flex-row gap-5 items-start min-h-[100px]' key={exp?.id}>
                        <Image src={''} alt='' width={50} height={50} className='bg-neutral-200' />
                        <div>
                            <h4 className='capitalize font-bold'>{exp?.instituteName}</h4>
                            <h5 className='capitalize'>{exp?.degree} in {exp?.fieldOfStudy}</h5>
                            <h5 className='capitalize text-[var(--lighttext)]'>{exp?.startDate} - {exp?.endDate}</h5>
                            <h5>Grade : {exp?.percentage}%</h5>
                        </div>

                        {isCurrentUser &&
                            <div className='absolute top-3 right-3 flex flex-row items-center gap-5'>
                                <Model
                                    bodyContent={
                                        <UserExperienceForm
                                            experience={exp}
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
                                    bodyContent={<DeleteEducationForm edu={exp} />}
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
                        }

                    </div>
                ))}

        </div>
    )
}

export default Experiences