'use client'

import JobListsSkeleton from "@/Skeletons/JobListsSkeleten"
import JobList from "../jobs/JobLists/JobList"
import Link from "next/link"
import { HiArrowLongRight } from "react-icons/hi2"

const AppliedJobs = ({ aplliedJobs, isLoading }: any) => {
    return (
        <div className="w-full space-y-2 min-h-[100px]">
            <h3 className="font-bold">Job You Applied ({aplliedJobs?.length || 0})</h3>
            {isLoading ?
                <JobListsSkeleton isDash />
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {aplliedJobs?.length > 0 ?
                        aplliedJobs?.slice(0, 4).map((job: any) => (
                            <div
                                key={job?.id}
                                className="border rounded-[20px] p-2 md:p-5 min-h-[100px]"
                                onClick={() => { '' }}
                            >
                                <JobList job={job} appliedJob={'hh'} app_or_pos="applied" />
                            </div>
                        ))
                        :
                        <h4>No Jobs Applied yet</h4>
                    }
                </div>
            }

            {aplliedJobs?.length > 4 &&
                <Link href={`/dashboard?appliedjobs`} className="flex flex-row items-center mx-auto gap-5 border p-3 rounded-lg max-w-max hover:opacity-50 trans">
                    <h5>Show all Applied Jobs</h5>
                    <HiArrowLongRight size={20} />
                </Link>
            }
        </div>
    )
}

export default AppliedJobs