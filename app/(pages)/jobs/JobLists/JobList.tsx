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
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { memo, useMemo } from "react";

interface JobListProps {
    isHover?: boolean;
    job?: any;
    more?: boolean;
    selectedJob?: any;
    appliedJob?: any;
}

const JobList = ({ isHover, job, more, selectedJob }: JobListProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const pathname = usePathname();
    const isAppliedJob = pathname === "/dashboard";

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
        relative w-full min-h-[120px] px-2 md:px-5 py-3 flex flex-row items-start gap-5 border-l-[4px] border-b-[1px] border-white border-b-neutral-200
      `}
        >
            <Image src={companyImage} alt="" width={60} height={60} className="w-[60px] h-[60px] object-contain" />

            <div className="w-full flex flex-col gap-1 items-start">
                <h3 className="text-lg font-bold capitalize">{jobTitle}</h3>
                <h5 className="text-sm font-semibold capitalize">{data?.companyName}</h5>
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
                    <Link href="/dashboard/jobStatus" className="w-full bg-green-300 flex items-center justify-between px-2 py-1 rounded-md cursor-pointer hover:opacity-50 font-semibold">
                        See Job Status
                        <MdKeyboardDoubleArrowRight size={20} />
                    </Link>
                )}
            </div>

            {more && (
                <Popover>
                    <PopoverTrigger asChild>
                        <button>
                            <Icon icon={<IoIosMore size={20} />} isHover title="More" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-max flex flex-col gap-1">
                        <Model
                            bodyContent={<CreateJobForm />}
                            title="Edit Job"
                            className="w-[1000px]"
                            desc="Edit Your Job Details"
                        >
                            <div className="flex items-center gap-3.5 hover:bg-neutral-100 py-2 px-5 cursor-pointer rounded-md">
                                <MdEdit size={20} />
                                Edit
                            </div>
                        </Model>
                        <Model
                            bodyContent={<DeleteJobForm />}
                            title="Delete Job"
                            className="w-[500px]"
                            desc="Are you sure you want to delete this job?"
                        >
                            <div className="flex items-center justify-between gap-5 hover:bg-neutral-100 py-2 px-5 cursor-pointer rounded-md">
                                <FaTrash size={15} />
                                Delete
                            </div>
                        </Model>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
};

export default memo(JobList);

JobList.displayName = "JobList";