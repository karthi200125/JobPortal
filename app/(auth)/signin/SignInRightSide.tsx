'use client'

import { useState } from 'react';
import { TiArrowRight } from "react-icons/ti";
import github from '../../../public/github.png';
import google from '../../../public/google.png';
// import logo from '../../public/logo.png'
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import Button from '@/components/Button';
import Link from 'next/link';
import LoginForm from '@/app/Forms/LoginForm';

const SigninRightSide = () => {

    const [showPass, setShowPass] = useState(false)

    return (
        <div className='flex flex-col items-center text-white justify-between h-screen w-[95%] sm:w-[50%] md:w-[40%] py-5'>

            <div className='bg-white/[0.05] h-[50px] flex items-center justify-center max-w-max rounded-full px-10'>
                <h6>Login with your account</h6>
            </div>
            <h2 className='font-semibold'>SignIn Account</h2>

            <LoginForm />

            {/* or */}
            <div className='w-full flex flex-row items-center justify-between text-neutral-500'>
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
                or
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
            </div>

            {/* optional auth google and github */}
            <div className='flex flex-row items-center justify-center gap-5'>
                <div className='w-[50px] h-[50px] flex items-center justify-center rounded-[15px] bg-white/[0.05] hover:bg-[var(--white)] cursor-pointer group trans'>
                    {/* <Image src={google.src} alt='' width={30} height={30} className='object-contain filter group-hover:invert trans' /> */}
                </div>
                <div className='w-[50px] h-[50px] flex items-center justify-center rounded-[15px] bg-white/[0.05] hover:bg-[var(--white)] cursor-pointer group trans'>
                    {/* <Image src={github.src} alt='' width={30} height={30} className='object-contain filter group-hover:invert trans' /> */}
                </div>
            </div>

            <h4 className='flex flex-row items-center gap-2 text-white/40'>
                Create a new Account?
                <Link href={'/signUp'} className='text-white cursor-pointer hover:opacity-50'>Sign UP</Link>
            </h4>

        </div>
    )
}

export default SigninRightSide