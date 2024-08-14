import { CiLocationOn } from "react-icons/ci";
import { BsSuitcaseLg } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const JobList = () => {
    return (
        <div className="relative w-full min-h-[120px] borderb px-5 py-3 flex flex-row items-start gap-5">

            <div className="w-[60px] h-[60px] bg-neutral-200"></div>

            <div className="space-y-1">
                <h3 className="text-lg font-bold">Full Stack Developer</h3>
                <h5 className="text-sm font-semibold">Compnay name</h5>
                <div className="flex flex-row gap-2 items-center">
                    <CiLocationOn size={15} />
                    <h5 className="text-xs">Chennai , Tamilnadu , India (OnSite)</h5>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <BsSuitcaseLg size={12} />
                    <h5 className="text-xs">5 years</h5>
                </div>
                {/* <div className="flex flex-row gap-2 items-center">
                    <MdOutlineCalendarMonth size={15} />
                    <h5 className="text-xs">2 Months Ago</h5>
                </div> */}

                <div className="flex flex-row gap-2 items-center">
                    <h5 className="text-xs">Promoted</h5>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <h5 className="text-xs">Easy Apply</h5>
                </div>

                {/* close */}
                <div className="absolute top-2 right-3 w-[30px] h-[30px] flexcenter hover:bg-neutral-100 trans cursor-pointer rounded-full">
                    <IoClose size={20} />
                </div>

            </div>

        </div>
    )
}

export default JobList