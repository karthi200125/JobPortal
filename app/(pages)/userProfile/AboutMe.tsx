'use client'

import UserAboutMeSkeleton from '@/Skeletons/UserAboutMeSkeleton';

interface AboutMeProps {
    profileUser?: any
    isLoading?: boolean
    isOrg?: boolean
    company?: any
}

const AboutMe = ({ profileUser, isLoading, company, isOrg }: AboutMeProps) => {
    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border overflow-hidden p-5'>
            <h3 className='font-bold mb-5'>About Me</h3>
            {isLoading ?
                <UserAboutMeSkeleton />
                :
                <>
                    {profileUser?.role !== "ORGANIZATION" &&
                        <h5>Phone No : <b>{profileUser?.phoneNo}</b></h5>
                    }
                    <p className='text-sm text-[var(--lighttext)] mt-5'>
                        {isOrg ? company?.companyAbout : profileUser?.userAbout}
                    </p>
                </>
            }
        </div>
    )
}

export default AboutMe