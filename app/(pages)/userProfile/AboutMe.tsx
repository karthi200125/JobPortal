'use client'

import UserAboutMeSkeleton from '@/Skeletons/UserAboutMeSkeleton';
import Skills from './Skills';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface AboutMeProps {
    profileUser?: any;
    isLoading?: boolean;
    isOrg?: boolean;
    company?: any;
}

const AboutMe = ({ profileUser, isLoading, company, isOrg }: AboutMeProps) => {
    const [sanitizedUserAbout, setSanitizedUserAbout] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (profileUser?.userAbout) {
            setSanitizedUserAbout(DOMPurify.sanitize(profileUser.userAbout));
        }
    }, [profileUser]);

    return (
        <div className='relative w-full min-h-[100px] rounded-[20px] border overflow-hidden p-5'>
            <h3 className='font-bold mb-5'>About Me</h3>
            {isLoading ? (
                <UserAboutMeSkeleton />
            ) : (
                <>
                    {isOrg ? (
                        <p className='text-sm text-[var(--lighttext)] mt-5'>
                            {company?.companyAbout}
                        </p>
                    ) : (
                        <div className="relative">
                            <div
                                className={`prose max-w-none text-xs md:text-sm transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-full' : 'line-clamp-3'}`}
                                dangerouslySetInnerHTML={{ __html: sanitizedUserAbout }}
                            />
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-2 text-blue-600 text-xs font-semibold focus:outline-none flex justify-end w-full"
                            >
                                {isExpanded ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    )}

                    {!isOrg && <Skills profileUser={profileUser} isLoading={isLoading} />}
                </>
            )}
        </div>
    );
};

export default AboutMe;
