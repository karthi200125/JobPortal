'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCompanyAction } from "@/actions/company/companyAction";
import Button from '@/components/Button';
import CustomFormField from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { getCities, getStates } from "@/getOptionsData";
import { CompanySchema } from "@/lib/SchemaTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useTransition } from 'react';
import { useSelector } from "react-redux";

const CompanyForm = () => {
    const user = useSelector((state: any) => state.user.user)
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [state, setState] = useState('');
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CompanySchema>>({
        resolver: zodResolver(CompanySchema),
        defaultValues: {
            companyName: user?.username || "",
            companyAddress: "",
            companyCity: "",
            companyState: "",
            companyCountry: "",
            companyWebsite: "",
            companyTotalEmployees: "",
            companyAbout: "",
            companyBio: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CompanySchema>) => {
        startTransition(() => {
            const userId = user?.id
            createCompanyAction(values, userId)
                .then((data) => {
                    console.log(data)
                    if (data?.success) {
                        setSuccess(data?.success)
                        router.push(`/userProfile/${user?.id}`)
                    }
                    if (data?.error) {
                        setErr(data?.error)
                    }
                })
        });
    };

    const { data: states = [] } = useQuery({
        queryKey: ['getStates'],
        queryFn: async () => await getStates(),
    });

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
                    />
                    <CustomFormField
                        name="companyState"
                        form={form}
                        label="Company State"
                        placeholder="Ex: TamilNadu"
                        isLoading={isLoading}
                    />
                    {/* {state && ( */}
                    <CustomFormField
                        name="companyCity"
                        form={form}
                        label="Company City"
                        placeholder="Ex: Chennai"
                        isLoading={isLoading}
                    />
                    {/* )} */}
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
                    name="companyBio"
                    form={form}
                    label="About Company Bio"
                    placeholder="Ex:write about company Bio"
                    isLoading={isLoading}
                    isTextarea
                />
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
