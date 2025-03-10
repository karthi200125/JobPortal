'use client';

import { getCompanyById } from "@/actions/company/getCompanyById";
import CreateJobForm from "@/app/Forms/CreateJobForm";
import DeleteJobForm from "@/app/Forms/DeleteJobForm";
import Icon from "@/components/Icon";
import Model from "@/components/Model/Model";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdEdit, MdKeyboardDoubleArrowRight } from "react-icons/md";
import noImage from "../../../../public/noImage.webp";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { memo, useMemo } from "react";
import { openModal } from "@/app/Redux/ModalSlice";

interface JobListProps {
    isHover?: boolean;
    job?: any;
    more?: boolean;
    selectedJob?: any;
    appliedJob?: any;
    app_or_pos?: "applied" | "posted";
    border?: boolean;
}

const JobList = ({ isHover, job, more, selectedJob, border = false, app_or_pos }: JobListProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const pathname = usePathname();
    const isAppliedJob = pathname === "/dashboard";
    const dispatch = useDispatch()

    const { companyId, jobTitle, city, state, country, mode, experience, vacancies, jobApplications, createdAt, isEasyApply } = job || {};

    const { data } = useQuery({
        queryKey: ["getCompany", companyId],
        queryFn: async () => await getCompanyById(companyId),
    });

    const isApplied = useMemo(() => {
        return jobApplications?.some((application: any) => application?.userId === user?.id);
    }, [jobApplications, user]);

    const companyImage = data?.companyImage || noImage.src;

    return (
        <div
            className={`
        ${job?.id === selectedJob ? "md:!border-l-black bg-neutral-100" : ""}
        ${isHover ? "hover:bg-neutral-100" : ""}
        relative w-full min-h-[120px] px-2 md:px-5 py-3 flex flex-row items-start gap-5 border-l-[4px] border-l-transparent
        ${border ? "border-b-[1px] border-b-neutral-200" : ""}
      `}
        >
            <div className="relative w-[60px] h-[60px] overflow-hidden">
                <Image src={companyImage} alt="" fill className="w-full h-full absolute top-0 left-0 object-contain" />
            </div>

            <div className="w-full flex flex-col gap-1 items-start">
                <h3 className="text-lg font-bold capitalize">{jobTitle}</h3>
                <h5 className="font-semibold capitalize">{data?.companyName}</h5>
                <div className="flex items-center gap-2">
                    <CiLocationOn size={15} />
                    <h5 className="text-xs">{city}, {state}, {country} ({mode})</h5>
                </div>
                <div className="flex items-center gap-2">
                    <BsSuitcaseLg size={12} />
                    <h5 className="text-xs pl-1">{experience}</h5>
                </div>

                {!isAppliedJob ? (
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h6 className="py-1 px-3 font-bold bg-neutral-200 rounded-[5px]">{vacancies} Vacancies</h6>
                            {isApplied && (
                                <h6 className="py-1 px-3 font-bold bg-green-200 text-green-600 rounded-[5px]">Applied</h6>
                            )}
                            {!isApplied && (
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-black"></span>
                                    <h5 className="text-xs">{isEasyApply ? "Easy Apply" : "Apply"}</h5>
                                </div>
                            )}
                        </div>
                        <h5 className="text-xs">{moment(createdAt).fromNow()}</h5>
                    </div>
                ) : (
                    <>
                        {app_or_pos === 'posted' &&
                            <Link href={`/dashboard/jobCandidates/${job?.id}`} className="w-full bg-green-300 flex items-center justify-between px-2 py-1 rounded-md cursor-pointer hover:opacity-50 font-semibold text-xs md:text-sm">
                                See applied Candidates
                                <MdKeyboardDoubleArrowRight size={20} />
                            </Link>
                        }
                        {app_or_pos === 'applied' &&
                            <Link href="/dashboard/jobStatus" className="w-full bg-green-300 flex items-center justify-between px-2 py-1 rounded-md cursor-pointer hover:opacity-50 font-semibold text-xs md:text-sm">
                                See Job Status
                                <MdKeyboardDoubleArrowRight size={20} />
                            </Link>
                        }
                    </>
                )}
            </div>

            {
                more && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button>
                                <Icon icon={<IoIosMore size={20} />} isHover title="More" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-max flex flex-col gap-1">
                            <Model
                                bodyContent={<CreateJobForm job={job} isEdit={true}/>}
                                title="Edit Job"
                                className="w-full md:w-[1000px]"
                                desc="Edit Your Job Details"
                                modalId="editjobmodal"
                            >
                                <div onClick={() => dispatch(openModal('editjobmodal'))} className="flex items-center gap-3.5 hover:bg-neutral-100 py-2 px-5 cursor-pointer rounded-md">
                                    <MdEdit size={20} />
                                    Edit
                                </div>
                            </Model>
                            <Model
                                bodyContent={<DeleteJobForm job={job}/>}
                                title="Delete Job"
                                className="w-full md:w-[500px]"
                                desc="Are you sure you want to delete this job?"
                                modalId="deletejobmodal"
                            >
                                <div onClick={() => dispatch(openModal('deletejobmodal'))} className="flex items-center justify-between gap-5 hover:bg-neutral-100 py-2 px-5 cursor-pointer rounded-md">
                                    <FaTrash size={15} />
                                    Delete
                                </div>
                            </Model>
                        </PopoverContent>
                    </Popover>
                )
            }
        </div >
    );
};

export default memo(JobList);

JobList.displayName = "JobList";