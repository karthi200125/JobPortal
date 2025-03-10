'use client'

import noProfile from '@/public/noProfile.webp'
import moment from 'moment'
import Image from "next/image"

interface chatUserProps {
    chatUser?: any,
    selectedChatUserId?: number | null
}

const ChatList = ({ chatUser, selectedChatUserId }: chatUserProps) => {

    const lastMessageUpdatedAt = moment(chatUser?.updatedAt).format("MMM D")

    return (
        <div className={`${chatUser?.id === selectedChatUserId && '!border-l-black bg-neutral-100'} w-full p-3 border-b max-h-max cursor-pointer trans hover:bg-neutral-100 flex flex-row items-center gap-5 md:border-l-[3px] border-solid border-l-white md:hover:border-l-black relative`}>
            <div className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full overflow-hidden flexcenter">
                <Image
                    src={chatUser?.userImage || noProfile.src}
                    alt="User Profile"
                    className="object-cover rounded-full"
                    width={50}
                    height={50}
                />
            </div>


            <div className="w-full space-y-1 text-start">
                <div className="w-full flex flex-row items-center justify-between">
                    <h4 className='capitalize text-sm md:text-lg hover:opacity-50 trans'>{chatUser?.username}</h4>
                    <h5>{lastMessageUpdatedAt}</h5>
                </div>
                <h5 className="text-neutral-500 capitalize line-clamp-1">{chatUser?.lastMessage}</h5>
            </div>

            {/* mesage count */}
            {chatUser?.isSeen &&
                <div className='absolute bottom-3 right-3 w-5 h-5 rounded-full bg-[var(--voilet)] flexcenter text-xs text-white font-bold'>1</div>
            }

        </div>
    )
}

export default ChatList