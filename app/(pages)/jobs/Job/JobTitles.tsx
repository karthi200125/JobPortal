import Image from "next/image"
import { IoIosMore } from "react-icons/io";
import { FaSuitcase } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { FaListCheck } from "react-icons/fa6";
import { HiLightBulb } from "react-icons/hi";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Model from "@/components/Model/Model";
import EasyApply from "./EasyApply/EasyApply";

const JobTitles = () => {
    return (
        <div className='space-y-5'>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <Image src={''} alt="" width={30} height={30} className="w-[20px] h-[20px] bg-neutral-200" />
                    <h5 className="text-sm font-bold">Company name</h5>
                </div>
                <Icon icon={<IoIosMore size={25} />} title="More" tooltipbg="white" isHover />
            </div>

            {/* job main details */}
            <div className="space-y-3">
                <h2>Full stack Developer</h2>
                <h4 className="text-[var(--textBlur)]"> Chennai , Tamilnadu , India . 3 months Ago . (100 applicants)</h4>
                <div className="flex flex-row gap-3 items-center">
                    <FaSuitcase size={20} />
                    <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">On Site</h5>
                    <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">Full Time</h5>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <CgCalendarDates size={25} />
                    <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">1 - 100 Employees</h5>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <FaListCheck size={20} />
                    <h5>10 skills match your profile - you may be a good fit</h5>

                    {/* skills */}
                    {/* <div className="w-full h-[100px] bg-red-300">

</div> */}
                </div>

                {/* premium */}
                <div className="flex flex-row gap-3 items-center">
                    <HiLightBulb size={25} />
                    <h5>See how you compare to over 100 other applicants. Reactivate Premium</h5>
                </div>

                {/* buttons */}
                <div className="flex flex-row items-center gap-3 mt-5">
                    <Model
                        bodyContent={<EasyApply />}
                        title={`Apply to Talent Corner HR Services Pvt Ltd`}
                        className='w-[1000px]'                        
                    >
                        <Button isLoading={false}>Easy Apply</Button>
                    </Model>
                    <Button isLoading={false} variant="border">Save</Button>
                </div>


            </div>
        </div>
    )
}

export default JobTitles