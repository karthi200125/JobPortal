'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/auth/login";
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
import { LoginSchema } from "@/lib/SchemaTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from 'react';
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { loginRedux } from "../Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { useCustomToast } from "@/lib/CustomToast";

const LoginForm = () => {
    const { showErrorToast } = useCustomToast();
    const [showPass, setShowPass] = useState(false)
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()
    const [role, setRole] = useState<string>('');

    const dispatch = useDispatch();

    const options = [
        "CANDIDATE",
        "ORGANIZATION",
        "RECRUITER",
    ]

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', JSON.stringify(role));
        }
    }, [role]);

    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            if (!role) {
                showErrorToast("Please select a role before signing in.");
                return;
            }
            login(values, role)
                .then((data) => {
                    if (data?.success) {
                        setSuccess(data?.success)
                        dispatch(loginRedux(data?.data))
                        setErr("")
                        router.push(`/userProfile/${data?.data?.id}`)
                    }
                    if (data?.error) {
                        console.log(data?.error)
                        setErr(data?.error)
                    }
                })
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">

                <Select onValueChange={setRole} value={role}>
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

                <div className="flex justify-end w-full">
                    <h5 className="text-white/50 text-xs hover:text-white trans cursor-pointer">Forget Password?</h5>
                </div>

                <FormError message={err} />
                <FormSuccess message={success} />
                <Button isLoading={isLoading} className="w-full !bg-white !text-black">Login</Button>
            </form>
        </Form>
    );
}

export default LoginForm;
