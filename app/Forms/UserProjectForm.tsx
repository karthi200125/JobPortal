"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userProjectAction } from "@/actions/user/userProjectsaction";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { UserProjectSchema } from "@/lib/SchemaTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { useSelector } from "react-redux";

interface UserProjectProps {
    isEdit?: boolean;
    project?: any;
}

export function UserProjectForm({ isEdit, project }: UserProjectProps) {
    const user = useSelector((state: any) => state.user.user);
    const [isLoading, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")

    const form = useForm<z.infer<typeof UserProjectSchema>>({
        resolver: zodResolver(UserProjectSchema),
        defaultValues: {
            proName: isEdit ? project?.proName : "",
            proDesc: isEdit ? project?.proDesc : "",
            proLink: isEdit ? project?.proLink : "",
            proImage: isEdit ? project?.proImage : "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserProjectSchema>) => {
        startTransition(() => {
            const userId = user?.id
            const proId = project?.id

            userProjectAction(values, userId, isEdit, proId)
                .then((data) => {
                    if (data?.success) {
                        setSuccess(data?.success)
                        queryClient.invalidateQueries({ queryKey: ['getuserproject', userId] })
                    }
                    if (data?.error) {
                        setErr(data?.error)
                    }
                })
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CustomFormField
                    name="proName"
                    form={form}
                    label="Project Title"
                    placeholder="Ex : Eccommerce Website"
                    isLoading={isLoading}
                />
                <CustomFormField
                    name="proLink"
                    form={form}
                    label="Project Link"
                    placeholder="Ex : https://exmaple.com"
                    isLoading={isLoading}
                />
                <CustomFormField
                    name="proDesc"
                    form={form}
                    label="Project Description"
                    placeholder="Ex : somthing about project"
                    isLoading={isLoading}
                    isTextarea
                />

                <CustomFormField
                    name="proImage"
                    form={form}
                    label="Project Image"
                    placeholder="Ex : image"
                    isLoading={isLoading}
                    isTextarea
                />

                <FormError message={err} />
                <FormSuccess message={success} />
                <Button isLoading={isLoading} className="!w-full">
                    {isEdit ? "Edit Project" : "Add Project"}
                </Button>
            </form>
        </Form>
    );
}
