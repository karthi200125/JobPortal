'use client'

import RegisterForm from "@/app/Forms/RegisterForm"
import Link from "next/link"


const SignUpRightSide = () => {

    return (
        <div className='flex flex-col items-center text-white justify-between h-screen w-full lg:w-[40%] py-5'>

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
            <div className='flex flex-row items-center justify-center gap-5'>
                <div className='w-[50px] h-[50px] flex items-center justify-center rounded-[15px] bg-white/[0.05] hover:bg-[var(--white)] cursor-pointer group trans'>
                    {/* <Image src={google.src} alt='' width={30} height={30} className='object-contain filter group-hover:invert trans' /> */}
                </div>
                <div className='w-[50px] h-[50px] flex items-center justify-center rounded-[15px] bg-white/[0.05] hover:bg-[var(--white)] cursor-pointer group trans'>
                    {/* <Image src={github.src} alt='' width={30} height={30} className='object-contain filter group-hover:invert trans' /> */}
                </div>
            </div>

            <h4 className='flex flex-row items-center gap-2'>
                Already Have an Account?
                <Link href={'/signin'} className='text-white cursor-pointer hover:opacity-50'>Sign In</Link>
            </h4>

        </div>
    )
}

export default SignUpRightSide