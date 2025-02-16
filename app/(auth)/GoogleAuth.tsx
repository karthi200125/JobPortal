'use client';

import Loader from '@/components/Loader/Loader';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import google from '../../public/google.png';
import { useCustomToast } from '@/lib/CustomToast';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const GoogleAuth = () => {
    const { showErrorToast } = useCustomToast();
    const [role, setRole] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(JSON.parse(storedRole));
        }
    }, []);

    const onClick = async () => {
        if (!role) {
            showErrorToast("Please select a role before signing in.");
            return;
        }
        setIsLoading(true);
        try {
            await signIn("google", {
                callbackUrl: pathname === '/signin' ? '/dashboard' : '/welcome',
                redirect: false,
            });
        } catch (error) {
            console.error("Error during sign-in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-5 w-full">
            {/* <Select onValueChange={setRole} value={role}>
                <SelectTrigger className="w-full bg-white/[0.02] border-[1px] border-white/10">
                    <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select> */}

            <button
                onClick={onClick}
                className={`w-full rounded-full flex items-center gap-4 justify-center py-2 border-[1px] border-white/10 transition hover:opacity-50 
                    ${isLoading ? '!cursor-not-allowed opacity-50' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <Image src={google} alt="Google logo" width={20} height={20} className="object-contain" />
                )}
                <h3 className="text-white/30 text-[15px]">
                    {isLoading ? 'Please wait ....' : pathname === '/signin' ? 'Sign In With Google' : 'Sign Up With Google'}
                </h3>
            </button>
        </div>
    );
};

export default GoogleAuth;
