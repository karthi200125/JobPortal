'use client'

import { getUserById } from '@/actions/auth/getUserById';
import { openModal } from '@/app/Redux/ModalSlice';
import Button from '@/components/Button';
import Model from '@/components/Model/Model';
import JobRecruiterSkeleton from '@/Skeletons/JobRecruiterSkeleton';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../../../public/noProfile.webp';
import MessageBox from '../../messages/MessageBox';

const JobRecruiter = ({ job, company, isPending }: any) => {

    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch()

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
                            <h6 className='text-[var(--lighttext)]'>Job poster</h6>
                        </div>
                        <Button
                            onClick={() => dispatch(openModal(`messageModel-${data?.id}`))}
                            disabled={!user?.isPro}
                            variant='border'
                            className="absolute top-3 right-3"
                        >
                            Message
                        </Button>
                    </div>
                    {/* Message Modal */}
                    <Model
                        bodyContent={<MessageBox receiverId={data?.id} chatUser={data} />}
                        title={`Message ${data?.username || 'User'}`}
                        className="min-w-[300px] lg:w-[800px]"
                        modalId={`messageModel-${data?.id}`}
                    >
                        <div></div>
                    </Model>
                </div>
            }
        </>
    )
}

export default JobRecruiter