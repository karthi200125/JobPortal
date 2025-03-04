'use client';

import Loader from '@/components/Loader/Loader';
import { useCustomToast } from '@/lib/CustomToast';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import google from '../../public/google.png';

const GoogleAuth = ({ role }: any) => {
    const { showErrorToast } = useCustomToast();
    const [isLoading, setIsLoading] = useState(false);

    const pathname = useRef(usePathname());
    const router = useRouter()

    const onClick = useCallback(async () => {
        if (!role) {
            showErrorToast("Please select a role before signing in.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await signIn("google", {
                callbackUrl: pathname.current === '/signin' ? '/dashboard' : '/welcome',
                redirect: false,
            })
            if (result?.url) {
                router.push(pathname.current === '/signin' ? '/dashboard' : '/welcome')
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        } finally {
            setIsLoading(false);
        }
    }, [role, showErrorToast]);

    return (
        <div className="space-y-5 w-full">
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
                    {isLoading ? 'Please wait ....' : pathname.current === '/signin' ? 'Sign In With Google' : 'Sign Up With Google'}
                </h3>
            </button>
        </div>
    );
};

export default memo(GoogleAuth);
