'use client'

import { deleteProject } from "@/actions/user/deleteProject";
import Button from "@/components/Button"
import { useCustomToast } from "@/lib/CustomToast";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { useParams } from "next/navigation";
import { useTransition } from "react";

const DeleteProjectForm = ({ project, onClose }: any) => {
    const [isLoading, startTransition] = useTransition();
    const queryClient = useQueryClient();
    const { showSuccessToast, showErrorToast } = useCustomToast()

    const { userId } = useParams()
    const id = Number(userId)

    const HandleDelete = () => {
        startTransition(() => {
            deleteProject(project?.id)
                .then((data: any) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getuserproject', id] })
                        queryClient.invalidateQueries({ queryKey: ['getuser', id] })
                        showSuccessToast(data?.success)
                        onClose()
                    }
                    if (data?.error) {
                        showErrorToast(data?.error)
                        onClose()
                    }
                })
        })
    }

    return (
        <div className="w-full space-y-5">
            <div className='flex flex-row gap-5 items-start min-h-[100px]'>
                <Image src={''} alt={project?.proName} width={50} height={50} className='bg-neutral-200 h-full w-full flex-1 rounded-md' />
                <div className="space-y-1 flex-1">
                    <h4 className='capitalize font-bold'>{project?.proName}</h4>
                    <h6 className='capitalize'>{project?.proLink}</h6>
                    <h6 className='capitalize text-[var(--lighttext)]'>{project?.proDesc}</h6>
                </div>
            </div>
            <Button className='w-full' isLoading={isLoading} onClick={HandleDelete}>Delete Project</Button>
        </div>
    )
}

export default DeleteProjectForm