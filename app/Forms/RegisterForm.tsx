'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/actions/auth/Register";
import Button from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useCustomToast } from "@/lib/CustomToast";
import { RegisterSchema } from "@/lib/SchemaTypes";
import { useEffect, useState, useTransition } from 'react';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";

const RegisterForm = ({ onRole }: { onRole: (role: string) => void }) => {
    const { showErrorToast } = useCustomToast();
    const [showPass, setShowPass] = useState(false)
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    const [role, setRole] = useState<string>('');

    const dispatch = useDispatch();

    const options = [
        "CANDIDATE",
        "ORGANIZATION",
        "RECRUITER",
    ]

    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            if (!role) {
                showErrorToast("Please select a role before signing in.");
                return;
            }
            register(values, role)
                .then((data) => {
                    if (data?.success) {
                        dispatch(loginRedux(data?.data))
                        setSuccess(data?.success)
                        window.location.href = '/welcome'
                        setErr("")
                    }
                    if (data?.error) {
                        setErr(data?.error)
                    }
                })
        })
    };

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', JSON.stringify(role));
        }
    }, [role]);

    const handleRoleChange = (value: string) => {
        setRole(value);
        onRole(value);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">

                <Select onValueChange={handleRoleChange} value={role}>
                    <SelectTrigger className="w-full bg-white/[0.02] border-[1px] border-white/10">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className='w-full space-y-3'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} className="bg-white/[0.02] border-[1px] border-solid border-white/10 placeholder:text-white/30" placeholder="Enter Username" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} className="bg-white/[0.02] border-[1px] border-solid border-white/10 placeholder:text-white/30" placeholder="Enter Email Address" type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative space-y-2">
                                        <Input {...field} className="bg-white/[0.02] border-[1px] border-solid border-white/10 placeholder:text-white/30" placeholder="Enter Password" type={showPass ? "text" : "password"} />
                                        <div className="absolute top-1 right-3 text-white/40 hover:text-white transition flex-center h-full cursor-pointer" onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <FaLockOpen /> : <FaLock />}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormError message={err} />
                <FormSuccess message={success} />
                <Button isLoading={isLoading} className="w-full !bg-white !text-black">Register</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
