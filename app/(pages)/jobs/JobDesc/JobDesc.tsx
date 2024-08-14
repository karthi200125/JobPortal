import Image from "next/image"
import { IoIosMore } from "react-icons/io";
import { FaSuitcase } from "react-icons/fa";

const JobDesc = () => {
    return (
        <div className="w-[60%] h-full overflow-y-auto p-5 space-y-5">

            {/* job desc top */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <Image src={''} alt="" width={30} height={30} className="w-[20px] h-[20px] bg-neutral-200" />
                    <h5 className="text-sm font-bold">Company name</h5>
                </div>
                <div className="w-[40px] h-[40px] flexcenter hover:bg-neutral-100 trans cursor-pointer rounded-full">
                    <IoIosMore size={25} />
                </div>
            </div>

            {/* job main details */}
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Full stack Developer</h2>
                <h5 className="text-sm"> Chennai , Tamilnadu , India . 3 months Ago . (100 applicants)</h5>
                <div className="flex flex-row gap-2 items-center">
                    <FaSuitcase size={25} />
                    <h5 className="text-xs bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">On Site</h5>
                    <h5 className="text-xs bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">Full Time</h5>
                </div>
            </div>


        </div>
    )
}

export default JobDesc