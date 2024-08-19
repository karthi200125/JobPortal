import { SkillsForm } from '@/app/Forms/SkillsForm';
import Icon from '@/components/Icon';
import Model from '@/components/Model/Model';
import React from 'react'
import { LuPencil } from 'react-icons/lu';
import { SlDiamond } from "react-icons/sl";

const AboutMe = () => {

    const skills = [
        'mern', 'react', 'html'
    ]

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border overflow-hidden p-5'>

            {/* <Model
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
            </Model> */}

            <h3 className='font-bold mb-5'>About Me</h3>
            <h5>Email : <b>𝘀𝗸𝗮𝗿𝘁𝗵𝗶𝗸𝗲𝘆𝗮𝗻𝟮𝟱𝟬𝟱𝟮𝟬𝟬𝟭@𝗴𝗺𝗮𝗶𝗹.𝗰𝗼𝗺</b></h5>
            <h5>Phone No : <b>𝟳𝟵𝟬𝟰𝟲𝟱𝟯𝟭𝟳𝟲</b></h5>

            <p className='text-sm text-[var(--lighttext)] mt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At porro corrupti alias blanditiis id tenetur nemo quam voluptatibus vel, ullam fuga consequatur, iure, impedit provident. Vitae aliquid explicabo tenetur perferendis illum et harum impedit dicta, reiciendis optio. Quo dignissimos est magni fuga error commodi perferendis qui cupiditate. Corporis esse dicta alias ea, beatae fugit, numquam illum eaque quisquam eveniet est cumque voluptatem consectetur quos unde magnam voluptas, porro dolorem odit dolores aut. Numquam quibusdam nobis natus dignissimos aut tempora quo aspernatur non exercitationem vitae dolorum consequuntur quod in nulla quaerat odit velit dolore ab, maxime quidem blanditiis! Deleniti, aliquam consequatur!</p>

            <div className='relative space-y-3 border rounded-[20px] p-5 mt-5'>
                <Model
                    bodyContent={<SkillsForm />}
                    title='Add Your Skills'
                    desc='add your Technical & soft skills'
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
                <div className='flex flex-row items-center gap-3'>
                    <SlDiamond size={20} />
                    <h3 className='font-bold'>Skills</h3>
                </div>

                <div className='flex flex-wrap gap-3'>
                    {skills?.map((skill) => (
                        <div
                            key={skill}
                            className='px-5 rounded-full h-[30px] text-sm font-semibold border flexcenter capitalize'
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AboutMe