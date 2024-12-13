"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { UserExperienceSchema } from "@/lib/SchemaTypes";
import CustomFormField from "@/components/CustomFormField";
import { useTransition } from "react";
import Button from "@/components/Button";

interface ExperienceProps {
    experience?: any,
    edit?: boolean,
}


export function UserExperienceForm({ experience, edit }: ExperienceProps) {
    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof UserExperienceSchema>>({
        resolver: zodResolver(UserExperienceSchema),
        defaultValues: {
            companyName: "",
            position: "",            
            startDate: "",
            endDate: "",            
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserExperienceSchema>) => {
        startTransition(() => {
            console.log(values);
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
                        placeholder="Institute Name"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="position"
                        form={form}
                        label="Job Position"
                        placeholder="Degree"
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

                <FormError message="" />
                <FormSuccess message="" />
                <Button isLoading={isLoading} className="!w-full" >Add Experience</Button>
            </form>
        </Form>
    );
}
