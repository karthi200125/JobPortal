'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import noProfile from '@/public/noProfile.webp'
import noImage from '@/public/noImage.webp'

const Chats = () => {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className='w-full overflow-y-auto p-3 flex flex-col gap-10 chatsh'>
            {/*user message */}
            <div className='max-w-[70%] flex flex-row gap-5 '>
                <div className="relative overflow-hidden rounded-full w-[30px] h-[30px]">
                    <Image src={noProfile.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                </div>
                <div className='w-[90%] p-3 bg-neutral-100 rounded-lg relative space-y-2'>
                    <div className="relative overflow-hidden rounded-md w-[100%] h-[150px] md:h-[300px]">
                        <Image src={noImage.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                    </div>
                    <h5 className=''>how are you</h5>
                    <span className="absolute bottom-[-25px] left-0 text-xs font-semibold">1 Min Ago</span>
                </div>
            </div>

            {/*my own message */}
            <div className='max-w-[70%] self-end bg-[var(--voilet)] rounded-lg p-3 relative space-y-2'>
                <div className="relative overflow-hidden rounded-md w-[100%] h-[150px] md:h-[300px]">
                    <Image src={noImage.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                </div>
                <h5 className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quibusdam placeat ad aliquam sapiente cupiditate temporibus laborum dicta, eveniet, totam facilis eos neque dolore consequuntur! Ea quod exercitationem facere fugit repellat! Illum iure, nisi expedita ipsam minus, possimus aperiam quos labore aspernatur nihil similique in nemo natus perferendis iusto officiis dicta doloremque fuga. Eaque quae officiis obcaecati laboriosam officia ipsam sunt necessitatibus impedit similique voluptate explicabo molestias repellendus fuga unde autem, qui ipsa veritatis inventore libero! Sapiente nulla laboriosam facere ullam perferendis voluptatem, veritatis officiis ut suscipit recusandae fugiat aperiam doloribus voluptates ipsa, iusto maxime reprehenderit totam minus, ea aut.</h5>
                <span className="absolute bottom-[-25px] left-0 text-xs font-semibold">1 Min Ago</span>
            </div>

            <div ref={endRef}></div>

        </div>
    )
}

export default Chats