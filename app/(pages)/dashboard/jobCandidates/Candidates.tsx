'use client'

import Model from "@/components/Model/Model"
import Image from "next/image"
import JobCandidate from "./JobCandidate"
import Button from "@/components/Button"
import { RiCloseFill } from "react-icons/ri";

const Candidates = () => {

    const candidates = [
        {
            id: 1,
            name: "test"
        },
        {
            id: 2,
            name: "test"
        },
    ]

    return (
        <div className="w-full flex flex-col gap-1">
            {candidates?.map((can) => (
                <Model
                    key={can?.id}
                    bodyContent={<JobCandidate />}
                    title='Job Applicant Profile'
                    className='w-[800px]'
                >
                    <div
                        className="w-full py-2 px-3 rounded-md hover:bg-neutral-100 flex flex-row items-start gap-5 cursor-pointer"
                    >
                        <div className="w-[80px] h-[80px] rounded-md bg-neutral-200">
                            {/* <Image src={''} alt="" width={60} height={60} className="rounded-md bg-neutral-200" /> */}
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex flex-col items-start">
                                <h4 className="font-bold">Karthikeyan</h4>
                                <h4 >karhti@gamil.com</h4>
                                <h4 className="text-[var(--lighttext)]">Software Dveelopement</h4>
                                <h4 className="py-1 rounded-[5px] px-2 bg-green-50 text-green-500 text-xs font-bold">Match : 100%</h4>
                            </div>
                            <Button variant="border" icon={<RiCloseFill size={15} />}>Not Intrested</Button>
                        </div>
                    </div>
                </Model>
            ))}

        </div>
    )
}

export default Candidates