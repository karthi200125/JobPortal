'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import google from '../../public/google.png';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { signIn } from 'next-auth/react';

const GoogleAuth = () => {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (provider: "google") => {
        // setIsLoading(true);
        // try {
        //     await signIn(provider, {
        //         callbackUrl: pathname === '/signin' ? '/dashboard' : '/welcome',
        //     });
        // } catch (error) {
        //     console.error("Error during sign-in:", error);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className="space-y-5 w-full">
            <h5 className="text-white/30 text-center w-full">
                Make sure you select user role above
            </h5>
            <button
                onClick={() => onClick("google")}
                className={`
                    w-full rounded-full flex flex-row items-center gap-4 justify-center 
                    py-2 border-[1px] border-solid border-white/10 
                    placeholder:text-white/30 cursor-pointer transition hover:opacity-50 
                    ${isLoading ? '!cursor-not-allowed opacity-50' : ''}
                `}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <Image
                        src={google}
                        alt="Google logo"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                )}
                <h3 className="text-white/30 text-[15px]">
                    {isLoading
                        ? 'Please wait ....'
                        : pathname === '/signin'
                            ? 'Sign In With Google'
                            : 'Sign Up With Google'}
                </h3>
            </button>
        </div>
    );
};

export default GoogleAuth;
