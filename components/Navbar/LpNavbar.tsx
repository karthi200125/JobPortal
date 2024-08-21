'use client'

import React from 'react'
import { LpNavLinks } from './LpNavLinks'
import Button from '../Button'
import { useRouter } from 'next/navigation'

const LpNavbar = () => {

    const router = useRouter()

    return (
        <div className='sticky top-0 bg-black left-0  w-full text-white h-[60px] flex flex-row items-center justify-between px-10'>
            <div className='flex flex-row items-center gap-20'>
                <h2>logo</h2>
                <LpNavLinks />
            </div>

            <div className='flex flex-row items-center gap-5'>
                <Button onClick={() => router.push('/signin')} className='bg-transparent'>Sign In</Button>
                <Button onClick={() => router.push('/signUp')}>Sign Up</Button>
            </div>

        </div>
    )
}

export default LpNavbar