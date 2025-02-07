'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState, useTransition } from 'react';
import { TiArrowRight } from "react-icons/ti";
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import Button from '@/components/Button';
import { FaLockOpen } from "react-icons/fa6";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FormError from '@/components/ui/FormError';
import FormSuccess from '@/components/ui/FormSuccess';
import { RegisterSchema } from "@/lib/SchemaTypes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { register } from "@/actions/auth/Register";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";


const RegisterForm = () => {

    const [showPass, setShowPass] = useState(false)
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()
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
            role: "CANDIDATE",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {                    
                    if (data?.success) {
                        dispatch(loginRedux(data?.data))
                        setSuccess(data?.success)
                        !router.push('/welcome')
                        setErr("")
                    }
                    if (data?.error) {
                        setErr(data?.error)
                    }
                })
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <div className='w-full space-y-3'>
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full bg-white/[0.02] border-[1px] border-solid border-white/10 placeholder:text-white/30">
                                            <SelectValue placeholder="Select Role" className="placeholder:text-white/30" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {options.map((option) => (
                                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
