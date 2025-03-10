'use client'

import { applyForJob } from '@/actions/job/ApplyJob'
import { closeModal } from '@/app/Redux/ModalSlice'
import Button from '@/components/Button'
import { useCustomToast } from '@/lib/CustomToast'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import noProfile from '../../../../../public/noProfile.webp'

interface EasyApplySubmitProps {
    job?: any;
    data?: any;
    safeSearchParams?: any;
}

const EasyApplySubmit = ({ data, job ,safeSearchParams }: EasyApplySubmitProps) => {
    const user = useSelector((state: any) => state.user.user)
    const [isLoading, startTransition] = useTransition()
    const queryClient = useQueryClient();
    const { showSuccessToast, showErrorToast } = useCustomToast();

    const dispatch = useDispatch()    

    const joinedArray = job?.questions?.map((q: any) => ({
        id: q.id,
        question: q.question,
        answer: data?.answers[q.id] || ""
    }));

    const handleSubmit = () => {
        startTransition(() => {
            const applyData = {
                userId: user?.id,
                jobId: job?.id,
                candidateEmail: data?.userData?.email,
                candidateMobile: data?.userData?.phone,
                candidateResume: data?.resume?.url,
                questionAndAnswers: joinedArray
            }
            applyForJob(
                applyData.userId,
                applyData.jobId,
                applyData.candidateEmail,
                applyData.candidateMobile,
                applyData.candidateResume,
                applyData.questionAndAnswers
            )
                .then((data: any) => {
                    if (data?.success) {
                        showSuccessToast(data?.success)
                        queryClient.invalidateQueries({
                            queryKey: ['getFiltredJobs', user?.id, safeSearchParams]
                        });
                        dispatch(closeModal('easyapplyModal'))
                    }
                    if (data?.error) {
                        showErrorToast(data?.error)
                    }
                })
        })
    }

    return (
        <div className='w-full p-5 rounded-md border space-y-5'>
            <div>
                <h3 className='font-bold'>Review your application</h3>
                <h6 className='text-[var(--lighttext)]'>The employer will also receive a copy of your profile.</h6>
            </div>

            <div className='space-y-5'>
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Contact Info</h3>
                    <div className="w-full border p-2 md:p-5 rounded-md flex flex-col md:flex-row items-start gap-2 md:gap-5">
                        <div className="h-[80px] w-[80px] relative">
                            <Image src={user?.userImage || noProfile.src} alt="" fill className="rounded-md bg-neutral-200 absolute top-0 left-0 w-full h-full" />
                        </div>
                        <div className="w-full flex flex-col md:flex-row items-start justify-between">
                            <div className="space-y-2">
                                <h4 className="font-bold">{user?.username}</h4>
                                <h5>{user?.profession}</h5>
                                <h5 className="text-[var(--lighttext)]">{user?.city}, {user?.state}, {user?.country}</h5>
                            </div>
                            <div className='space-y-2'>
                                <div>
                                    <h6 className='text-[var(--lighttext)]'>Email Address *</h6>
                                    <h4>{data?.userData?.email}</h4>
                                </div>
                                <div>
                                    <h6 className='text-[var(--lighttext)]'>Phone Number *</h6>
                                    <h4>{data?.userData?.phone}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='space-y-2'>
                    <h3 className="font-semibold text-sm">Resume</h3>
                    <h6 className='text-[var(--lighttext)]'>Be sure to include an updated resume *</h6>
                    <div className='border rounded-md p-5'>
                        {data?.resume?.name}
                    </div>
                </div>

                <div className='space-y-2'>
                    <h3 className="font-semibold text-sm">Additional Questions</h3>
                    <h6 className='text-[var(--lighttext)]'>Please answer the additional questions *</h6>
                    <div className='space-y-2 border rounded-md p-5'>
                        {joinedArray?.map((qs: any) => (
                            <div key={qs?.id}>
                                <h6 className='text-[var(--lighttext)]'>{qs?.question}</h6>
                                <h4>{qs?.answer}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end w-full">
                <Button isLoading={isLoading} onClick={handleSubmit}>Submit Application</Button>
            </div>
        </div>
    )
}

export default EasyApplySubmit
