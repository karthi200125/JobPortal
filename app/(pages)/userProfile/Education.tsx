import Image from 'next/image'
import React from 'react'

const Education = () => {

    return (
        <div className='w-full min-h-[100px] rounded-[20px] border p-5 space-y-5'>
            <h3 className='font-bold'>Education</h3>

            <div className='flex flex-row gap-5 items-start min-h-[100px]'>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200' />
                <div>
                    <h4 className='font-bold'>Avs colleg of tech nolyg</h4>
                    <h5>Bachelor's degree, Electrical and Electronics Engineering</h5>
                    <h5 className='text-[var(--lighttext)]'>2018 - 2022</h5>
                    <h5>Grade : 77%</h5>
                </div>
            </div>
            <div className='flex flex-row gap-5 items-start min-h-[100px]'>
                <Image src={''} alt='' width={50} height={50} className='bg-neutral-200' />
                <div>
                    <h4 className='font-bold'>Avs colleg of tech nolyg</h4>
                    <h5>Bachelor's degree, Electrical and Electronics Engineering</h5>
                    <h5 className='text-[var(--lighttext)]'>2018 - 2022</h5>
                    <h5>Grade : 77%</h5>
                </div>
            </div>

        </div>
    )
}

export default Education