'use client'

import { getApplicationCandidates } from "@/actions/jobapplication/getApplicationcandidates"
import { openModal } from "@/app/Redux/ModalSlice"
import Button from "@/components/Button"
import Model from "@/components/Model/Model"
import { useQuery } from "@tanstack/react-query"
import { FaCheck } from "react-icons/fa6"
import { RiCloseFill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import JobCandidate from "./JobCandidate"

const Candidates = ({ job, jobId }: any) => {

    const { data: candidates, isPending } = useQuery({
        queryKey: ['getJobapplicationCandidates', jobId],
        queryFn: async () => await getApplicationCandidates(jobId),
    });

    console.log(candidates)

    const dispatch = useDispatch()

    return (
        <div className="w-full flex flex-col gap-1">
            {isPending ?
                "loading...."
                :
                candidates?.length > 0 ?
                    "No Candidates Yet!"
                    :
                    candidates?.map((can: any) => (
                        <Model
                            key={can?.id}
                            bodyContent={<JobCandidate />}
                            title='Job Applicant Profile'
                            className='w-[800px]'
                            modalId="jobcandidatemodal"
                        >
                            <div
                                className="w-full py-2 px-3 rounded-md hover:bg-neutral-100 flex flex-row items-start gap-5 cursor-pointer"
                                onClick={() => dispatch(openModal('jobcandidatemodal'))}
                            >
                                <div className="w-[80px] h-[80px] rounded-md bg-neutral-200">
                                    <img src={''} alt="" className="rounded-md bg-neutral-200 w-[60px] h-[60px]" />
                                </div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="flex flex-col items-start">
                                        <h4 className="font-bold">{can?.user?.username}</h4>
                                        <h4 >{can?.candidateEmail}</h4>
                                        <h4 className="text-[var(--lighttext)]">{can?.user?.profession}</h4>
                                        <h4 className="py-1 rounded-[5px] px-2 bg-green-50 text-green-500 text-xs font-bold">Match : 100%</h4>
                                    </div>
                                    <div className="flex flex-row items-center gap-5">
                                        <Button variant="border" icon={<FaCheck size={15} />}>Accept</Button>
                                        <Button variant="border" icon={<RiCloseFill size={15} />}>Not Intrested</Button>
                                    </div>
                                </div>
                            </div>
                        </Model>
                    ))}

        </div>
    )
}

export default Candidates