import Button from "@/components/Button";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";

const ChatButton = () => {
    return (
        <div className="absolute bottom-0 md:bottom-3 left-0 w-full flex flex-row items-center justify-between gap-2 md:gap-5 px-3 border-t-[1px] border-solid border-neutral-200 py-3 bg-white z-10">
            <input type="" hidden id="chatfileselect" accept="file/*" />
            <input type="" hidden id="chatimageselect" accept="image/*" />
            <label htmlFor="chatimageselect" className="cursor-pointer trans hover:opacity-50">
                <MdAttachFile size={30} />
            </label>
            <label htmlFor="chatfileselect" className="cursor-pointer trans hover:opacity-50">
                <CiImageOn size={30} />
            </label>

            <input type="text" className="w-full bg-neutral-100 p-2 rounded-md" />
            <Button className='flex flex-row items-center gap-2'>
                <h4 className="hidden md:block">send</h4>
                <IoMdSend size={20} />
            </Button>

        </div>
    )
}

export default ChatButton