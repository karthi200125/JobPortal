import CreateJobForm from "@/app/Forms/CreateJobForm";
import DeleteJobForm from "@/app/Forms/DeleteJobForm";
import Icon from "@/components/Icon";
import Model from "@/components/Model/Model";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdEdit } from "react-icons/md";

interface JobListProps {
    isActive?: boolean;
    isHover?: boolean;
    job?: any
    more?: boolean
}

const JobList = ({ isActive, isHover, job, more }: JobListProps) => {

    return (
        <div className={`${isActive && " border-black"} ${isHover && "hover:bg-neutral-100 hover:border-black"} relative w-full min-h-[120px] px-2 md:px-5 py-3 flex flex-row items-start gap-5 border-l-[4px] border-white trans `}>

            <div className="w-[60px] h-[60px] bg-neutral-200"></div>

            <div className="w-full flex flex-col gap-1 items-start">
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
                    <h5 className="text-xs">Promoted</h5>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <h5 className="text-xs">Easy Apply</h5>
                </div> */}

                <div className="flex flex-row gap-2 items-center justify-between">
                    <h6 className="py-1 px-3 font-bold bg-neutral-200 rounded-[5px]">10 Vacancies</h6>
                    <h5 className="text-xs">2 Months Ago</h5>
                </div>

            </div>

            {more &&
                <Popover>
                    <PopoverTrigger asChild className="absolute top-0 right-0">
                        <button>
                            <Icon
                                icon={<IoIosMore size={20} />}
                                isHover
                                title="More"
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-max flex flex-col gap-1">
                        <Model
                            bodyContent={<CreateJobForm />}
                            title='Edit Job'
                            className='w-[1000px]'
                            desc="Edit Your Job Details"
                        >
                            <div className="flex flex-row items-center gap-3.5 hover:bg-neutral-100 trans py-2 px-5 trans cursor-pointer rounded-md">
                                <MdEdit size={20} />
                                Edit
                            </div>
                        </Model>
                        <Model
                            bodyContent={<DeleteJobForm />}
                            title='Delete Job'
                            className='w-[500px]'
                            desc="Are you Sure Your want Delete This Job"
                        >
                            <div className="flex flex-row items-center justify-between gap-5 hover:bg-neutral-100 trans py-2 px-5 trans cursor-pointer rounded-md">
                                <FaTrash size={15} />
                                Delete
                            </div>
                        </Model>
                    </PopoverContent>
                </Popover>
            }

        </div>
    )
}

export default JobList