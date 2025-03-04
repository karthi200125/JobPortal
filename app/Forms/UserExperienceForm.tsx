"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userExperienceAction } from "@/actions/user/userExperinceaction";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import { useCustomToast } from "@/lib/CustomToast";
import { UserExperienceSchema } from "@/lib/SchemaTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Redux/ModalSlice";

interface ExperienceProps {
    experience?: any,
    edit?: boolean,
}


export function UserExperienceForm({ experience, edit }: ExperienceProps) {
    const user = useSelector((state: any) => state.user.user);
    const [isLoading, startTransition] = useTransition();
    const [err, setErr] = useState("")

    const { showErrorToast, showSuccessToast } = useCustomToast()
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    const { userId } = useParams()
    const id = Number(userId)

    const form = useForm<z.infer<typeof UserExperienceSchema>>({
        resolver: zodResolver(UserExperienceSchema),
        defaultValues: {
            companyName: edit ? experience?.companyName : "",
            position: edit ? experience?.position : "",
            startDate: edit ? experience?.startDate : "",
            endDate: edit ? experience?.endDate : "",
            description: edit ? experience?.description : "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserExperienceSchema>) => {
        startTransition(() => {
            const userId = user?.id
            const expId = experience?.id
            const isEdit = edit ? true : false

            userExperienceAction(values, userId, isEdit, expId)
                .then((data: any) => {
                    if (data.success) {
                        showSuccessToast(data?.success)
                        queryClient.invalidateQueries({ queryKey: ['getuserExperience', id] })
                        dispatch(closeModal(isEdit ? 'userEditExpModal' : 'userExpModal'))
                    }
                    if (data.error) {
                        setErr(data?.error)
                        showErrorToast(data.error);
                    }
                })
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomFormField
                        name="companyName"
                        form={form}
                        label="Company Name"
                        placeholder="Company Name"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="position"
                        form={form}
                        label="Job Position"
                        placeholder="Job Position"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="startDate"
                        form={form}
                        label="Start Date"
                        placeholder="Start Date"
                        isLoading={isLoading}
                    />

                    <CustomFormField
                        name="endDate"
                        form={form}
                        label="End Date"
                        placeholder="End Date"
                        isLoading={isLoading}
                    />


                </div>
                <CustomFormField
                    isTextarea
                    name="description"
                    form={form}
                    label="About Your Previous Job"
                    placeholder="Description"
                    isLoading={isLoading}
                />

                <FormError message={err} />
                <Button isLoading={isLoading} className="!w-full" >Add Experience</Button>
            </form>
        </Form>
    );
}
