import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const UserInfo = () => {
    return (
        <div className=' relative w-full min-h-[200px] overflow-hidden rounded-[20px] border '>

            {/* image container */}
            <div className='absolute top-0 left-0 w-full h-[200px]'>
                <Image src={''} alt='' width={100} height={200} className='bg-neutral-200 w-full h-full' />
                <Image src={''} alt='' width={150} height={150} className='bg-red-400 w-[150px] h-[150px] absolute bottom-[-40px] left-5 rounded-full border-[4px] border-solid border-[var(--white)]' />
            </div>

            <div className='mt-[250px] w-full h-[300px] p-5 space-y-2'>
                <h2 className='font-bold'>Karthi Keyan</h2>
                <h3 className='w-[70%]'>looking for Full Stack Developer role as fresher| React Js , Nextjs , Node.js , Mongo Db , MYSQL , Typescript , Tailwind | Express.js , Git , Redux</h3>
                <h4>Chennai, Tamil Nadu, India </h4>
                <Link href={''}>Personal Website</Link>
                <div className='flex flex-row items-center gap-5'>
                    <h4>100 Followers</h4>
                    <h4>200 Followings</h4>
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <Button variant='border'>Follow</Button>
                    <Button variant='border'>Message</Button>
                </div>
            </div>

        </div>
    )
}

export default UserInfo