"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCompanies } from "@/actions/company/getCompanies";
import { UserUpdate } from "@/actions/user/UpdateUser";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import { useCustomToast } from "@/lib/CustomToast";
import { UserInfoSchema } from "@/lib/SchemaTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";
import { closeModal } from "../Redux/ModalSlice";
import UserAbout from "./UserAbout";

interface UserInfoFormProps {
    currentStep?: number;
    onNext?: (value: number) => void;
}

export function UserInfoForm({ currentStep = 1, onNext }: UserInfoFormProps) {
    const user = useSelector((state: any) => state.user.user);
    const [isLoading, startTransition] = useTransition();
    const pathname = usePathname()
    const queryClient = useQueryClient();
    const [userAbout, setUserAbout] = useState(user?.userAbout || "");

    const isRec = user?.role === "RECRUITER"

    const [err, setErr] = useState("")
    const { showSuccessToast } = useCustomToast()

    const dispatch = useDispatch();

    const { data: companies = [], isLoading: companyLoading } = useQuery({
        queryKey: ['getCompanies'],
        queryFn: async () => await getCompanies(),
    });

    const companiesOptions = companies?.map((company: any) => company?.companyName)

    const form = useForm<z.infer<typeof UserInfoSchema>>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues: {
            username: user?.username || "",
            userBio: user?.userBio || "",            
            website: user?.website || "",
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            gender: user?.gender || "",
            address: user?.address || "",
            city: user?.city || "",
            state: user?.state || "",
            country: user?.country || "",
            phoneNo: user?.phoneNo || "",
            postalCode: user?.postalCode || "",
            profession: user?.profession || "",
            currentCompany: user?.currentCompany || "",
        },
    });

    const onSubmit = (values: z.infer<typeof UserInfoSchema>) => {
        startTransition(() => {
            const id = user?.id
            if (isRec) {
                if (!values.currentCompany) {
                    setErr("Select company")
                }
                setErr('')
            }
            UserUpdate(values, id , userAbout)
                .then((data) => {
                    if (data?.success) {
                        dispatch(loginRedux(data?.data))
                        queryClient.invalidateQueries({ queryKey: ['getuser', id] })
                        showSuccessToast(data?.success)
                        if (pathname === '/welcome' && onNext) {
                            onNext(currentStep + 1);
                        }
                        dispatch(closeModal('userInfoFormModal'))
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
                        name="firstName"
                        form={form}
                        label="First Name"
                        placeholder="Ex: John"
                        isLoading={isLoading}
                    />
                    <CustomFormField
                        name="lastName"
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
                        placeholder="Ex : software Developer"
                        isLoading={isLoading}
                    />
                </div>
                <CustomFormField
                    name="userBio"
                    form={form}
                    label="User Bio"
                    placeholder="Ex : Full Stack Developer in % yeas Exp"
                    isLoading={isLoading}
                    isTextarea
                />
                <CustomFormField
                    name="website"
                    form={form}
                    label="User Personal Website"
                    placeholder="Ex : https://exmaple.com"
                    isLoading={isLoading}
                />
                {isRec &&
                    <CustomFormField
                        name="currentCompany"
                        form={form}
                        label="Select Your Current Company, we will send a verification request to the company"
                        placeholder="Ex: Google"
                        isLoading={isLoading}
                        isSelect
                        options={companiesOptions}
                        optionsLoading={companyLoading}
                    />
                }

                <div className="space-y-2">
                    <h5 className="font-bold">About User</h5>
                    <UserAbout onUserAbout={setUserAbout} UserAbout={user?.userAbout} />
                </div>

                <FormError message={err} />
                <Button isLoading={isLoading} className="!w-full">
                    {pathname === '/welcome' ? "Next" : "Update"}
                </Button>
            </form>
        </Form>
    );
}
