"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { UserEducationSchema } from "@/lib/SchemaTypes";
import CustomFormField from "@/components/CustomFormField";
import { useTransition } from "react";
import Button from "@/components/Button";

export function UserEducationForm() {
    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof UserEducationSchema>>({
        resolver: zodResolver(UserEducationSchema),
        defaultValues: {
            instituteName: "",
            degree: "",
            fieldofstudy: "",
            startDate: "",
            endDate: "",
            percentage: "",
            educationDesc: "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserEducationSchema>) => {
        startTransition(() => {
            console.log(values);
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomFormField
                        name="instituteName"
                        form={form}
                        label="Institute Name"
                        placeholder="Institute Name"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="degree"
                        form={form}
                        label="Degree"
                        placeholder="Degree"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="fieldofstudy"
                        form={form}
                        label="Field of Study"
                        placeholder="Field of Study"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="percentage"
                        form={form}
                        label="Percentage"
                        placeholder="Percentage"
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
                    name="educationDesc"
                    form={form}
                    label="Activities and societies"
                    placeholder="Description"
                    isLoading={isLoading}
                />

                <FormError message="" />
                <FormSuccess message="" />
                <Button isLoading={isLoading} className="!w-full" >Add Education</Button>
            </form>
        </Form>
    );
}
