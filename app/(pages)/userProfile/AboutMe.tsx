'use client'

import UserAboutMeSkeleton from '@/Skeletons/UserAboutMeSkeleton';

interface AboutMeProps {
    profileUser?: any
    isLoading?: boolean
}

const AboutMe = ({ profileUser, isLoading }: AboutMeProps) => {
    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border overflow-hidden p-5'>
            <h3 className='font-bold mb-5'>About Me</h3>
            {isLoading ?
                <UserAboutMeSkeleton />
                :
                <>
                    <h5>Email : <b>{profileUser?.email}</b></h5>
                    <h5>Phone No : <b>{profileUser?.phoneNo}</b></h5>
                    <p className='text-sm text-[var(--lighttext)] mt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At porro corrupti alias blanditiis id tenetur nemo quam voluptatibus vel, ullam fuga consequatur, iure, impedit provident. Vitae aliquid explicabo tenetur perferendis illum et harum impedit dicta, reiciendis optio. Quo dignissimos est magni fuga error commodi perferendis qui cupiditate. Corporis esse dicta alias ea, beatae fugit, numquam illum eaque quisquam eveniet est cumque voluptatem consectetur quos unde magnam voluptas, porro dolorem odit dolores aut. Numquam quibusdam nobis natus dignissimos aut tempora quo aspernatur non exercitationem vitae dolorum consequuntur quod in nulla quaerat odit velit dolore ab, maxime quidem blanditiis! Deleniti, aliquam consequatur!</p>
                </>
            }
        </div>
    )
}

export default AboutMe