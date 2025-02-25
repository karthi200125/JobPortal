import Icon from '@/components/Icon'
import noProfile from '@/public/noProfile.webp'
import Image from 'next/image'
import { IoIosMore } from 'react-icons/io'

const ChatUser = () => {
    return (
        <div className="w-full flex flex-row items-center justify-between border-b h-[90px] px-3 z-10">
            <div className='flex flex-row items-center gap-5'>
                <div className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-full overflow-hidden relative">
                    <Image
                        src={noProfile.src}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        fill
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="capitalize">Karhtikeyan</h3>
                    <h5>last chat mnessage</h5>
                </div>
            </div>
            <Icon icon={<IoIosMore size={25} />} title="More" tooltipbg="white" isHover />
        </div>
    )
}

export default ChatUser