'use client'

import JobListsSkeleton from "@/Skeletons/JobListsSkeleten"
import JobList from "../jobs/JobLists/JobList"
import Link from "next/link"
import { HiArrowLongRight } from "react-icons/hi2"

interface ShowJobsProps {
    Jobs?: any,
    isLoading?: boolean,
    title?: string,
    href?: string,
    type?: 'applied' | 'posted' | undefined
}

const ShowJobs = ({ Jobs, isLoading, title, href, type }: ShowJobsProps) => {

    return (
        <div className="w-full space-y-2 min-h-[100px]">
            <h3 className="font-bold">Your {title} ({Jobs?.length || 0})</h3>
            {isLoading ?
                <JobListsSkeleton isDash count={2} />
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {Jobs?.length > 0 ?
                        Jobs?.slice(0, 4).map((job: any) => (
                            <div
                                key={job?.id}
                                className="border rounded-[20px] p-2 md:p-5 min-h-[100px]"
                                onClick={() => { '' }}
                            >
                                <JobList job={job} appliedJob={'hh'} app_or_pos={type} />
                            </div>
                        ))
                        :
                        <h4>No Jobs yet</h4>
                    }
                </div>
            }

            {Jobs?.length > 4 &&
                <Link href={`${href}`} className="flex flex-row items-center mx-auto gap-5 border p-3 rounded-lg max-w-max hover:opacity-50 trans">
                    <h5>Show all {title}</h5>
                    <HiArrowLongRight size={20} />
                </Link>
            }
        </div>
    )
}

export default ShowJobs