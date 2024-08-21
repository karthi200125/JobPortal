import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo.png'

const AuthLeftSide = () => {
    return (
        <div className='w-full flex flex-row items-center justify-center gap-5'>
            <div className='w-[30%] h-screen flexcenter'>
                <div className='authlogoleft flexcenter w-[90px] h-[90px] rounded-[20px]'>
                    <Image src={logo.src} alt='' width={70} height={70} className='object-contain' />
                </div>
            </div>
            <div className='w-[70%] text-white'>
                <h2 className='font-bold text-3xl'>Launch your career journey in seconds</h2>
            </div>
        </div>
    )
}

export default AuthLeftSide