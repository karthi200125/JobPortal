"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { UserInfoSchema } from "@/lib/SchemaTypes";
import CustomFormField from "@/components/CustomFormField";
import { useTransition } from "react";
import Button from "@/components/Button";

export function UserInfoForm() {
    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof UserInfoSchema>>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues: {
            username: "",
            email: "",
            firstname: "",
            lastname: "",
            gender: "",
            address: "",
            city: "",
            state: "",
            country: "",
            phoneNo: "",
            postalCode: "",
            profession: "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserInfoSchema>) => {
        startTransition(() => {
            console.log(values);
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomFormField
                        name="username"
                        form={form}
                        label="User Name"
                        placeholder="User Name"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="email"
                        form={form}
                        label="Email"
                        placeholder="Email"
                        isLoading={isLoading}
                        type="email"
                    />
                    <CustomFormField
                        name="firstname"
                        form={form}
                        label="First Name"
                        placeholder="First Name"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="lastname"
                        form={form}
                        label="Last Name"
                        placeholder="Last Name"
                        isLoading={isLoading}
                    />

                    <CustomFormField
                        name="address"
                        form={form}
                        label="Your Address"
                        placeholder="Address"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="city"
                        form={form}
                        label="City"
                        placeholder="City"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="state"
                        form={form}
                        label="State"
                        placeholder="State"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="country"
                        form={form}
                        label="Country"
                        placeholder="Country"
                        isLoading={isLoading}
                    />

                    <CustomFormField
                        name="postalCode"
                        form={form}
                        label="postalCode"
                        placeholder="postalCode"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="phoneNo"
                        form={form}
                        label="phone Number"
                        placeholder="Phone Number"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        isSelect
                        name="gender"
                        form={form}
                        label="Gender"
                        placeholder="Gender"
                        isLoading={isLoading}
                        options={['Male', 'Female', "Others"]}
                    />
                    <CustomFormField
                        name="profession"
                        form={form}
                        label="Your Profession Name"
                        placeholder="Your Profession Name"
                        isLoading={isLoading}
                    />
                </div>
                {/* <CustomFormField
                    isTextarea
                    name="description"
                    form={form}
                    label="Write About You"
                    placeholder="Write About You"
                    isLoading={isLoading}
                /> */}

                <FormError message="" />
                <FormSuccess message="" />
                <Button isLoading={isLoading} className="!w-full" >Update</Button>
            </form>
        </Form>
    );
}
