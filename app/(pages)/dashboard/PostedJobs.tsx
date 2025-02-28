'use client'

import JobListsSkeleton from "@/Skeletons/JobListsSkeleten"
import JobList from "../jobs/JobLists/JobList"
import Button from "@/components/Button"
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

const PostedJobs = ({ postedJobs, isLoading, user }: any) => {
    return (
        <div className="w-full space-y-2 min-h-[100px]">
            <h3 className="font-bold">Job You Posted ({postedJobs?.length || 0})</h3>
            {isLoading ?
                <JobListsSkeleton isDash />
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {postedJobs?.length > 0 ?
                        postedJobs?.slice(0, 4).map((job: any) => (
                            <div
                                key={job?.id}
                                className="border rounded-[20px] p-2 md:p-5 min-h-[100px]"
                            >
                                <JobList more job={job} app_or_pos="posted" />
                            </div>
                        ))
                        :
                        <h4>No Jobs Posted yet</h4>
                    }
                </div>
            }

            {postedJobs?.length > 4 &&
                <Link href={`/dashboard?postedjobs`} className="flex flex-row items-center mx-auto gap-5 border p-3 rounded-lg max-w-max hover:opacity-50 trans">
                    <h5>Show all Posted Jobs</h5>
                    <HiArrowLongRight size={20} />
                </Link>
            }

        </div>
    )
}

export default PostedJobs