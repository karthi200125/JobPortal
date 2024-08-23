"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UserUpdate } from "@/actions/user/UpdateUser";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { UserInfoSchema } from "@/lib/SchemaTypes";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";

export function UserInfoForm() {
    const user = useSelector((state: any) => state.user.user);
    const [isLoading, startTransition] = useTransition();

    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")

    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof UserInfoSchema>>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
            firstname: user?.firstname || "",
            lastname: user?.lastname || "",
            gender: user?.gender || "",
            address: user?.address || "",
            city: user?.city || "",
            state: user?.state || "",
            country: user?.country || "",
            phoneNo: user?.phoneNo || "",
            postalCode: user?.postalCode || "",
            profession: user?.profession || "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserInfoSchema>) => {
        startTransition(() => {
            const id = user?.id
            UserUpdate(values, id)
                .then((data) => {
                    if (data?.success) {
                        setSuccess(data?.success)
                        dispatch(loginRedux(data?.data))
                    }
                    if (data?.error) {
                        console.log(data?.error)
                        setErr(data?.error)
                    }
                })
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomFormField
                        name="username"
                        form={form}
                        label="User Name"
                        placeholder="Ex: John Doe"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="email"
                        form={form}
                        label="Email"
                        placeholder="Ex: john.doe@gmail.com"
                        isLoading={isLoading}
                        type="email"
                    />
                    <CustomFormField
                        name="firstname"
                        form={form}
                        label="First Name"
                        placeholder="Ex: John"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="lastname"
                        form={form}
                        label="Last Name"
                        placeholder="Ex: Doe"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="address"
                        form={form}
                        label="Your Address"
                        placeholder="Ex: 123 Main St"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="city"
                        form={form}
                        label="City"
                        placeholder="Ex: Chennai"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="state"
                        form={form}
                        label="State"
                        placeholder="Ex: Tamil Nadu"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="country"
                        form={form}
                        label="Country"
                        placeholder="Ex: India"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="postalCode"
                        form={form}
                        label="Postal Code"
                        placeholder="Postal Code"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="phoneNo"
                        form={form}
                        label="Phone Number"
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
                        options={['Male', 'Female', 'Others']}
                    />
                    <CustomFormField
                        name="profession"
                        form={form}
                        label="Your Profession"
                        placeholder="Your Profession"
                        isLoading={isLoading}
                    />
                </div>

                <FormError message={err} />
                <FormSuccess message={success} />
                <Button isLoading={isLoading} className="!w-full">
                    Update
                </Button>
            </form>
        </Form>
    );
}
