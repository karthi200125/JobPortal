'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import noProfile from '@/public/noProfile.webp'
import noImage from '@/public/noImage.webp'

const Chats = ({ messages, currentUserId, isPending }: { messages: any, currentUserId: number, isPending?: boolean }) => {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='w-full overflow-y-auto p-3 flex flex-col gap-10 chatsh'>
            {messages?.map((msg: any) => (
                <div key={msg.id} className={`max-w-[70%] flex ${msg.senderId === currentUserId ? "self-end bg-[var(--voilet)] text-white" : "flex-row gap-5"}`}>
                    {/* User message (left side) */}
                    {msg.senderId !== currentUserId && (
                        <div className="relative overflow-hidden rounded-full w-[30px] h-[30px]">
                            <Image src={noProfile.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                        </div>
                    )}

                    <div className={`w-full p-2 rounded-[20px] relative space-y-2 ${msg.senderId === currentUserId ? "bg-[var(--voilet)] text-white" : "bg-neutral-100"}`} >
                        {/* Display image if exists */}
                        {msg.image && (
                            <div className="relative overflow-hidden rounded-md w-[500px] h-[150px] md:h-[300px]">
                                <Image src={msg.image || noImage.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                            </div>
                        )}

                        {/* Message text */}
                        <h5 className='min-w-[80px]'>{msg.message}</h5>

                        {/* Timestamp */}
                        <span className="absolute bottom-[-20px] left-0 text-xs font-semibold text-black">{msg?.sentAt}</span>
                    </div>
                </div>
            ))}

            <div ref={endRef}></div>
        </div>
    )
}

export default Chats;
