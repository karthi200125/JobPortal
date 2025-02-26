'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import noProfile from '@/public/noProfile.webp'
import noImage from '@/public/noImage.webp'
import moment from 'moment'

const Chats = ({ messages, currentUserId, isPending, user }: { messages: any, user?: any, currentUserId: number, isPending?: boolean }) => {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    return (
        <div className='w-full overflow-y-auto p-3 flex flex-col gap-10 chatsh'>
            {messages?.map((msg: any) => (
                <div
                    key={msg.id}
                    className={`max-w-[70%] flex gap-2                        
                         ${msg.senderId === currentUserId && "self-end  text-white"}
                         `}
                >                    
                    <div className={`relative space-y-2`} >
                        {msg.image && (
                            <div className="relative overflow-hidden rounded-md w-[500px] h-[150px] md:h-[300px]">
                                <Image src={msg.image || noImage.src} alt='' fill className='absolute top-0 left-0 w-full h-full object-cover' />
                            </div>
                        )}
                        <div className={`flex gap-2
                             ${msg.senderId === currentUserId ? "flex-row" : "flex-row-reverse"} 
                             ${msg.senderId === currentUserId && "self-end  text-white"}`}
                        >
                            <h5 className={`min-w-[80px] max-w-max p-2 capitalize rounded-md ${msg.senderId === currentUserId ? "bg-[var(--voilet)] text-white" : "bg-neutral-100 max-w-max"}`}>{msg.text}</h5>
                            <Image
                                src={(msg.senderId !== currentUserId ? msg?.sender?.userImage : user?.userImage) || noProfile.src}
                                alt=''
                                width={35}
                                height={35}
                                className='w-[35px] h-[35px] rounded-full object-cover'
                            />
                        </div>
                        <span className={`${msg.senderId !== currentUserId && "left-[43px]"} absolute bottom-[-20px] left-0 text-xs font-semibold text-black`}>{moment(msg?.updatedAt).format("h:mm A")}</span>
                    </div>
                </div>
            ))}

            <div ref={endRef}></div>
        </div>
    )
}

export default Chats;
