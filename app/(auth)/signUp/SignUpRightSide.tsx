'use client'

import RegisterForm from "@/app/Forms/RegisterForm"
import GoogleAuth from "@/app/(auth)/GoogleAuth"
import Link from "next/link"

const SignUpRightSide = () => {

    return (
        <div className='flex flex-col items-center text-white justify-between h-screen w-[95%] sm:w-[50%] md:w-[40%] py-5'>

            <div className='bg-white/[0.05] h-[50px] flex items-center justify-center max-w-max rounded-full px-10'>
                <h6>Create a New  account</h6>
            </div>
            <h2 className='font-semibold'>SignUp Account</h2>

            <RegisterForm />

            {/* or */}
            <div className='w-full flex flex-row items-center justify-between text-neutral-500'>
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
                or
                <span className='w-[40%] h-[1px] bg-neutral-700'></span>
            </div>

            {/* optional auth google and github */}
            <GoogleAuth />

            <h4 className='flex flex-row items-center gap-2 text-white/40'>
                Already Have an Account?
                <Link href={'/signin'} className='text-white cursor-pointer hover:opacity-50'>Sign In</Link>
            </h4>

        </div>
    )
}

export default SignUpRightSide