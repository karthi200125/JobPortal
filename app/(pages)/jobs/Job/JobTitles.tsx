'use client'

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Model from "@/components/Model/Model";
import moment from "moment";
import Image from "next/image";
import { CgCalendarDates } from "react-icons/cg";
import { FaSuitcase } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { HiLightBulb } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import EasyApply from "./EasyApply/EasyApply";
import { VscLinkExternal } from "react-icons/vsc";
import { useTransition } from "react";
// import { savedJob } from "@/actions/user/savedJob";
import { useDispatch, useSelector } from "react-redux";
import { SavedJobAction } from "../../../../actions/user/SavedJobAction";
import { userSavedJobs } from "@/app/Redux/AuthSlice";
import noImage from '../../../../public/noImage.webp'
import JobTitlesSkeleton from "@/Skeletons/JobTitlesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { checkSkills } from "@/actions/job/CompareSkills";

const JobTitles = ({ job, company, isPending }: any) => {
    const user = useSelector((state: any) => state.user?.user)
    const dispatch = useDispatch()
    const [isLoading, startTransition] = useTransition()

    const isSaved = user?.savedJobs.includes(job?.id)

    const HandleSaveJob = () => {
        startTransition(() => {
            const jobId = job?.id
            const userId = user?.id
            SavedJobAction(userId, jobId)
                .then((data: any) => {
                    if (data?.success) {
                        dispatch(userSavedJobs(jobId))
                    }
                    if (data?.error) {
                        console.log(data?.error)
                    }
                })
        })
    }

    const { data, isPending: perLoading } = useQuery({
        queryKey: ['getSkillsPer', user, job],
        queryFn: async () => checkSkills(user, job),
    });


    const Per = data?.per || 0
    const message = data?.Msg

    return (
        <>
            {isPending ?
                <JobTitlesSkeleton />
                :
                <div className='space-y-5'>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Image src={company?.companyImage || noImage.src} alt="" width={30} height={30} className="w-[20px] h-[20px] bg-neutral-200" />
                            <h5 className="text-sm font-bold">{company?.companyName}</h5>
                        </div>
                        <Icon icon={<IoIosMore size={25} />} title="More" tooltipbg="white" isHover />
                    </div>

                    {/* job main details */}
                    <div className="space-y-3">
                        <h2 className="capitalize">{job?.jobTitle}</h2>
                        <h4 className="text-[var(--textBlur)]"> {job?.city} , {job?.state} , {job?.coutry} . {moment(job?.createdAt).fromNow()} . (100 applicants)</h4>
                        <div className="flex flex-row gap-3 items-center">
                            <FaSuitcase size={20} />
                            <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">{job?.mode}</h5>
                            <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">{job?.type}</h5>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <CgCalendarDates size={25} />
                            <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">{company?.companyTotalEmployees} Employees</h5>
                        </div>

                        <div className="flex flex-row gap-3 items-start md:items-center">
                            <FaListCheck size={20} />
                            <h5><b>{Per}%</b> skills matched your profile - <span className={`${Per > 70 ? "text-green-400" : "text-orange-400"}`}>{message}</span></h5>
                        </div>

                        {/* premium */}
                        <div className="flex flex-row gap-3 items-start md:items-center">
                            <HiLightBulb size={25} />
                            <h5>See how you compare to over 100 other applicants. Reactivate Premium</h5>
                        </div>

                        {/* buttons */}
                        <div className="flex flex-row items-center gap-3 mt-5">
                            {job?.isEasyApply ?
                                <Model
                                    bodyContent={<EasyApply job={job} />}
                                    title={`Apply to Talent Corner HR Services Pvt Ltd`}
                                    className='w-[1000px]'
                                >
                                    <Button >Easy Apply</Button>
                                </Model>
                                :
                                <Button icon={<VscLinkExternal size={15} />} >Apply on Company Site</Button>
                            }
                            <Button
                                onClick={HandleSaveJob}
                                className={`${isSaved ? "!bg-black !text-white" : "!text-black !bg-white border"}`}
                                isLoading={isLoading}
                            >
                                {isSaved ? "Un Save" : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default JobTitles