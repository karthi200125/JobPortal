'use client';

import Image from 'next/image';
import google from '../../public/google.png';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader/Loader';

const GoogleAuth = () => {
    const pathname = usePathname();

    const isLoading = false;

    return (
        <button
            className={`
                w-full rounded-full flex flex-row items-center gap-4 justify-center 
                py-2 border-[1px] border-solid border-white/10 
                placeholder:text-white/30 cursor-pointer trans hover:opacity-50 
                ${isLoading && '!cursor-not-allowed'}
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
    );
};

export default GoogleAuth;
