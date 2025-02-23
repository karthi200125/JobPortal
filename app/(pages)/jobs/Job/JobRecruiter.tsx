'use client'

import { getUserById } from '@/actions/auth/getUserById';
import Button from '@/components/Button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import noAvatar from '../../../../public/noProfile.webp'
import JobRecruiterSkeleton from '@/Skeletons/JobRecruiterSkeleton';
import { useSelector } from 'react-redux';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const JobRecruiter = ({ job, company, isPending }: any) => {

    const user = useSelector((state: any) => state.user.user);
    const router = useRouter()

    const { data, isLoading } = useQuery({
        queryKey: ['getUser', job?.userId],
        queryFn: async () => await getUserById(job?.userId),
    });

    return (
        <>
            {(isLoading || isPending) ?
                <JobRecruiterSkeleton />
                :
                <div className='relative w-full border rounded-[10px] min-h-[100px] p-5 space-y-3'>
                    <h3 className='font-bold'>Meet The Hiring Team</h3>
                    <div className='flex flex-row items-start gap-5'>
                        <Image width={50} height={50} src={data?.userImage || noAvatar.src} alt='Recruiter Image' className='bg-neutral-200 rounded-full object-cover' />
                        <div className='space-y-1'>
                            <Link href={`/userProfile/${data?.id}`} className='font-bold'>{data?.username}</Link>
                            <h5>{data?.profession || "Recruiter"} At {company?.companyName}</h5>
                            <h5>Technical recruiting</h5>
                            <h6 className='text-[var(--lighttext)]'>Job poster</h6>
                        </div>
                        <Button onClick={() => router.push('/messages')} disabled={!user?.isPro} className='absolute top-3 right-3' variant='border'>Message</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default JobRecruiter