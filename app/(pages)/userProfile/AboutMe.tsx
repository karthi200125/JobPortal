'use client'

import UserAboutMeSkeleton from '@/Skeletons/UserAboutMeSkeleton';
import Skills from './Skills';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface AboutMeProps {
    profileUser?: any
    isLoading?: boolean
    isOrg?: boolean
    company?: any
}

const AboutMe = ({ profileUser, isLoading, company, isOrg }: AboutMeProps) => {

    const [sanitizedUserAbout, setSanitizedUserAbout] = useState('');

    useEffect(() => {
        if (profileUser?.userAbout) {
            setSanitizedUserAbout(DOMPurify.sanitize(profileUser?.userAbout));
        }
    }, [profileUser]);

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border overflow-hidden p-5'>
            <h3 className='font-bold mb-5'>About Me</h3>
            {isLoading ?
                <UserAboutMeSkeleton />
                :
                <>
                    {isOrg ?
                        <p className='text-sm text-[var(--lighttext)] mt-5'>
                            {company?.companyAbout}
                        </p>
                        :
                        <div className="prose max-w-none text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: sanitizedUserAbout }} />
                    }


                    {!isOrg && <Skills profileUser={profileUser} isLoading={isLoading} />}
                </>
            }
        </div>
    )
}

export default AboutMe