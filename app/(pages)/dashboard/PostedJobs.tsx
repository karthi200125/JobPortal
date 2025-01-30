'use client'

import JobListsSkeleton from "@/Skeletons/JobListsSkeleten"
import JobList from "../jobs/JobLists/JobList"

const PostedJobs = ({ postedJobs, isLoading, user }: any) => {
    return (
        <div className="w-full space-y-2 min-h-[100px]">
            <h3 className="font-bold">Job You Posted ({postedJobs?.length || 0})</h3>
            {isLoading ?
                <JobListsSkeleton isDash />
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {postedJobs?.length > 0 ?
                        postedJobs?.map((job: any) => (
                            <div
                                key={job?.id}
                                className="border rounded-[20px] p-5 min-h-[100px]"
                            >
                                <JobList more job={job} />
                            </div>
                        ))
                        :
                        <h4>No Jobs Posted yet</h4>
                    }
                </div>
            }
        </div>
    )
}

export default PostedJobs