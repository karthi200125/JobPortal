'use client'

import LoginForm from '@/app/Forms/LoginForm';
import GoogleAuth from '@/app/(auth)/GoogleAuth';
import Link from 'next/link';
import { useState } from 'react';

const SigninRightSide = () => {

    const [role, setRole] = useState('')

    return (
        <div className='flex flex-col items-center text-white space-y-5 md:justify-between h-screen w-[95%] sm:w-[50%] md:w-[40%] py-5'>

            <div className='bg-white/[0.05] h-[50px] flex items-center justify-center max-w-max rounded-full px-10'>
                <h6>Login with your account</h6>
            </div>
            <h2 className='font-semibold'>SignIn Account</h2>

            <LoginForm onRole={(r: string) => setRole(r)} />

            {/* or */}
            <div className='w-full flex flex-row items-center justify-between text-neutral-500'>
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
                or
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
            </div>

            {/* optional auth google and github */}
            <GoogleAuth role={role} />

            <h4 className='flex flex-row items-center gap-2 text-white/40'>
                Create a new Account?
                <Link href={'/signUp'} className='text-white cursor-pointer hover:opacity-50'>Sign UP</Link>
            </h4>

        </div>
    )
}

export default SigninRightSide