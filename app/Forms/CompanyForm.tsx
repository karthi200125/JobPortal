'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CompanySchema } from "@/lib/SchemaTypes";
import Button from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { Input } from '@/components/ui/input';
import CustomFormField from "@/components/CustomFormField";
import { useRouter } from "next/navigation";
import { useState, useTransition } from 'react';
import { createCompanyAction } from "@/actions/company/companyAction";
import { useSelector } from "react-redux";

const CompanyForm = () => {
    const user = useSelector((state: any) => state.user.user)
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CompanySchema>>({
        resolver: zodResolver(CompanySchema),
        defaultValues: {
            companyName: "",
            companyImage: "",
            companyAddress: "",
            companyCity: "",
            companyState: "",
            companyCountry: "",
            companyWebsite: "",
            companyTotalEmployees: "",
            companyAbout: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CompanySchema>) => {
        startTransition(() => {
            const userId = user?.id
            createCompanyAction(values, userId)
                .then((data) => {
                    console.log(data)
                    if (data?.success) {
                    }
                })
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomFormField
                        name="companyName"
                        form={form}
                        label="Company Name"
                        placeholder="Ex: Google"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="companyImage"
                        form={form}
                        label="Company Image"
                        placeholder="Ex: https://example.com/image.jpg"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="companyAddress"
                        form={form}
                        label="Company Address"
                        placeholder="Ex: 123 Street"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="companyCountry"
                        form={form}
                        label="Company Country"
                        placeholder="Ex: India"
                        isLoading={isLoading}
                        isSelect
                        options={['India']}
                    />
                    <CustomFormField
                        name="companyState"
                        form={form}
                        label="Company State"
                        placeholder="Ex: Tamil Nadu"
                        isLoading={isLoading}
                        isSelect
                        options={['Tamil Nadu']}
                    />
                    <CustomFormField
                        name="companyCity"
                        form={form}
                        label="Company City"
                        placeholder="Ex: Bangalore"
                        isLoading={isLoading}
                        isSelect
                        options={['Bangalore']}
                    />
                    <CustomFormField
                        name="companyWebsite"
                        form={form}
                        label="Company Website"
                        placeholder="Ex: https://google.com"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="companyTotalEmployees"
                        form={form}
                        label="Company Total Employees"
                        placeholder="Ex: 100"
                        isLoading={isLoading}
                    />
                </div>
                <CustomFormField
                    name="companyAbout"
                    form={form}
                    label="About Company"
                    placeholder="Ex:write about company"
                    isLoading={isLoading}
                    isTextarea
                />

                <FormError message={err} />
                <FormSuccess message={success} />
                <Button isLoading={isLoading} className="w-full">Submit</Button>
            </form>
        </Form>
    );
}

export default CompanyForm;
