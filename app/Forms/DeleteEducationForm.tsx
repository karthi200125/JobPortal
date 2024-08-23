'use client'

import { deleteEducation } from "@/actions/user/deleteEducation";
import Button from "@/components/Button"
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { useParams } from "next/navigation";
import { useTransition } from "react";

const DeleteEducationForm = ({ edu }: any) => {

    const [isLoading, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const { userId } = useParams()
    const id = Number(userId)

    const HandleDelete = () => {
        startTransition(() => {
            deleteEducation(edu?.id)
                .then((data: any) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getuserEducation', id] })
                    }
                    if (data?.error) {

                    }
                })
        })
    }

    return (
        <div className="w-full">
            <div className='relative flex flex-row gap-5 items-start min-h-[100px]' key={edu?.id}>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200' />
                <div>
                    <h4 className='capitalize font-bold'>{edu?.instituteName}</h4>
                    <h5 className='capitalize'>{edu?.degree} in {edu?.fieldOfStudy}</h5>
                    <h5 className='capitalize text-[var(--lighttext)]'>{edu?.startDate} - {edu?.endDate}</h5>
                    <h5>Grade : {edu?.percentage}%</h5>
                </div>
            </div>
            <Button className='w-full' isLoading={isLoading} onClick={HandleDelete}>Delete Education</Button>
        </div>
    )
}

export default DeleteEducationForm