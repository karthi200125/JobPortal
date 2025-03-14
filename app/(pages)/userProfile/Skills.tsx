import { SkillsForm } from '@/app/Forms/SkillsForm'
import { openModal } from '@/app/Redux/ModalSlice'
import Icon from '@/components/Icon'
import Model from '@/components/Model/Model'
import SkillsSkeleton from '@/Skeletons/SkillsSkeleton'
import React from 'react'
import { LuPencil } from 'react-icons/lu'
import { SlDiamond } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'

interface SkillsProps {
    profileUser?: any
    isLoading?: boolean
}

const Skills = ({ profileUser, isLoading }: SkillsProps) => {
    const user = useSelector((state: any) => state.user?.user)
    const isCurrentUser = user?.id === profileUser?.id
    const dispatch = useDispatch()

    return (
        <div className='relative space-y-3 border rounded-[20px] p-5 mt-5'>
            {isCurrentUser &&
                <Model
                    bodyContent={<SkillsForm skillsData={profileUser?.skills} />}
                    modalId="userSkillsModal"
                    title='Add Your Skills'
                    desc='add your Technical & soft skills'
                    className='min-w-[300px] lg:w-[800px] min-h-[100px]'
                    triggerCls='absolute top-3 right-3'
                >
                    <Icon
                        className=''
                        icon={<LuPencil size={20} />}
                        isHover
                        title='Edit Profile'
                        onClick={() => dispatch(openModal('userSkillsModal'))}
                    />
                </Model>
            }

            <div className='flex flex-row items-center gap-3'>
                <SlDiamond size={20} />
                <h3 className='font-bold'>Skills</h3>
            </div>

            <div className='flex flex-wrap gap-3'>
                {isLoading ?
                    <SkillsSkeleton />
                    :
                    profileUser?.skills?.map((skill: any) => (
                        <div
                            key={skill}
                            className='px-5 rounded-full h-[30px] text-sm font-semibold border flexcenter capitalize'
                        >
                            {skill}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Skills