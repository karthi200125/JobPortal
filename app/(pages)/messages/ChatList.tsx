import noProfile from '@/public/noProfile.webp'
import Image from "next/image"

const ChatList = () => {
    return (
        <div className="w-full p-3 border-b max-h-max cursor-pointer trans hover:bg-neutral-100 flex flex-row items-center gap-5 md:border-l-[3px] border-solid border-l-white md:hover:border-l-black relative">
            <div className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full overflow-hidden relative">
                <Image
                    src={noProfile.src}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    fill
                />
            </div>
            <div className="w-full space-y-1 text-start">
                <div className="w-full flex flex-row items-center justify-between">
                    <h4 className='capitalize text-sm md:text-lg hover:opacity-50 trans'>Karhtikeyan</h4>
                    <span className='text-sm'>Feb 3</span>
                </div>
                <h5 className="text-neutral-500">last chat mnessage</h5>
            </div>

            {/* mesage count */}
            <div className='absolute bottom-3 right-3 w-5 h-5 rounded-full bg-[var(--voilet)] flexcenter text-xs text-white font-bold'>2</div>

        </div>
    )
}

export default ChatList