'use client'

import { getUserExperience } from '@/actions/user/getUserExperience'
import DeleteExperienceForm from '@/app/Forms/DeleteExperienceForm'
import { UserExperienceForm } from '@/app/Forms/UserExperienceForm'
import { openModal } from '@/app/Redux/ModalSlice'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import ExperiencesSkeleton from '@/Skeletons/ExperiencesSkeleton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { CiTrash } from "react-icons/ci"
import { GoPlus } from 'react-icons/go'
import { LuPencil } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import noImage from '../../../public/noImage.webp'

interface ExperiencesProps {
    userId?: any,
    profileUser?: any,
}

const Experiences = ({ userId, profileUser }: ExperiencesProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()

    const { data, isPending } = useQuery({
        queryKey: ['getuserExperience', userId],
        queryFn: async () => await getUserExperience(userId),
    });

    const isCurrentUser = user?.id === profileUser?.id

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border p-5 space-y-5'>
            <div className='flex flex-row items-center justify-between'>
                <h3 className='font-bold'>Experiences</h3>
                {isCurrentUser &&
                    <Model
                        bodyContent={<UserExperienceForm />}
                        modalId="userExpModal"
                        title='Add you Experience'
                        className='min-w-[300px] lg:w-[1000px]'
                        desc='Add you previus and current Experience details'
                    >
                        <Button variant='border' icon={<GoPlus size={20} />} onClick={() => dispatch(openModal('userExpModal'))}>Add</Button>
                    </Model>
                }
            </div>

            {isPending ?
                <ExperiencesSkeleton />
                :
                data?.data?.map((exp: any) => (
                    <div className='relative flex flex-row gap-5 items-start min-h-[100px]' key={exp?.id}>
                        <Image src={noImage.src || ''} alt='' width={50} height={50} className='bg-neutral-200' />
                        <div>
                            <h4 className='capitalize font-bold'>{exp?.companyName}</h4>
                            <h5 className='capitalize text-[var(--lighttext)]'>{exp?.startDate} - {exp?.endDate}</h5>
                            <h5 className='capitalize'>{exp?.position}</h5>
                            <h5 className='text-neutral-400'>{exp?.description}</h5>
                        </div>

                        {isCurrentUser &&
                            <div className='absolute bottom-0 md:top-3 right-3 flex flex-row items-center gap-5'>
                                <Model
                                    bodyContent={
                                        <UserExperienceForm
                                            experience={exp}
                                            edit
                                        />
                                    }
                                    modalId="userEditExpModal"
                                    title='Edit This Education'
                                    className='min-w-[300px] lg:w-[1000px]'
                                    desc='Edit Your education details'
                                >
                                    <Icon
                                        className=''
                                        icon={<LuPencil size={20} />}
                                        isHover
                                        title='Edit Education'
                                        onClick={() => dispatch(openModal('userEditExpModal'))}
                                    />
                                </Model>
                                <Model
                                    bodyContent={<DeleteExperienceForm exp={exp} />}
                                    modalId="userDeleteExpModal"
                                    title='Delete This Experience'
                                    className='min-w-[300px] lg:w-[400px]'
                                    desc='Are you Sure Delete Your experience'
                                >
                                    <Icon
                                        icon={<CiTrash size={20} />}
                                        isHover
                                        title='Delete Experience'
                                        onClick={() => dispatch(openModal('userDeleteExpModal'))}
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