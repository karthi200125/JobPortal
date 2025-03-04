'use client'

import { getUserEducation } from '@/actions/user/getUserEducation'
import DeleteEducationForm from '@/app/Forms/DeleteEducationForm'
import { UserEducationForm } from '@/app/Forms/UserEducationForm'
import { openModal } from '@/app/Redux/ModalSlice'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import EducationsSkeleton from '@/Skeletons/EducationsSkeleton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { CiTrash } from "react-icons/ci"
import { GoPlus } from 'react-icons/go'
import { LuPencil } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import noImage from '../../../public/noImage.webp'

interface EducationsProps {
    userId?: any,
    profileUser?: any,
}

const Educations = ({ userId, profileUser }: EducationsProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()

    const { data, isPending } = useQuery({
        queryKey: ['getuserEducation', userId],
        queryFn: async () => await getUserEducation(userId),
    });

    const isCurrentUser = user?.id === profileUser?.id

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border p-5 space-y-5'>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='font-bold'>Education</h3>
                {isCurrentUser &&
                    <Model
                        bodyContent={<UserEducationForm />}
                        modalId="userEduModal"
                        title='Add you Education'
                        className='min-w-[300px] lg:w-[1000px]'
                        desc='Add you previus and current education details'
                    >
                        <Button variant='border' onClick={() => dispatch(openModal('userEduModal'))} icon={<GoPlus size={20} />}>Add</Button>
                    </Model>
                }
            </div>

            {isPending ?
                <EducationsSkeleton />
                :
                data?.data?.map((edu) => (
                    <div className='relative flex flex-row gap-5 items-start min-h-[100px]' key={edu?.id}>
                        <Image src={noImage.src || ''} alt='' width={50} height={50} className='bg-neutral-200' />
                        <div>
                            <h4 className='capitalize font-bold'>{edu?.instituteName}</h4>
                            <h5 className='capitalize'>{edu?.degree} in {edu?.fieldOfStudy}</h5>
                            <h5 className='capitalize text-[var(--lighttext)]'>{edu?.startDate} - {edu?.endDate}</h5>
                            <h5>Grade : {edu?.percentage}%</h5>
                        </div>

                        {isCurrentUser &&
                            <div className='absolute bottom-0 md:top-3 right-3 flex flex-row items-center gap-5'>
                                <Model
                                    bodyContent={
                                        <UserEducationForm
                                            education={edu}
                                            edit
                                        />
                                    }
                                    modalId="userEditEduModal"
                                    title='Edit This Education'
                                    className='min-w-[300px] lg:w-[1000px]'
                                    desc='Edit Your education details'
                                >
                                    <Icon
                                        className=''
                                        icon={<LuPencil size={20} />}
                                        isHover
                                        title='Edit Education'
                                        onClick={() => dispatch(openModal('userEditEduModal'))}
                                    />
                                </Model>
                                <Model
                                    bodyContent={<DeleteEducationForm edu={edu} />}
                                    modalId="userDeleteEduModal"
                                    title='Delete This Education'
                                    className='w-[400px]'
                                    desc='Are you Sure Delete Your education'
                                >
                                    <Icon
                                        icon={<CiTrash size={20} />}
                                        isHover
                                        title='Delete Education'
                                        onClick={() => dispatch(openModal('userDeleteEduModal'))}
                                    />
                                </Model>
                            </div>
                        }

                    </div>
                ))}

        </div>
    )
}

export default Educations