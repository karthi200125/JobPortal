'use client'

import JobListsSkeleton from "@/Skeletons/JobListsSkeleten"
import JobList from "../jobs/JobLists/JobList"

const AppliedJobs = ({ aplliedJobs, isLoading }: any) => {
    return (
        <div className="w-full space-y-2 min-h-[100px] border rounded-[20px] p-5">
            <h3 className="font-bold">Job You Applied ({aplliedJobs?.length || 0})</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {isLoading ?
                    <JobListsSkeleton isDash />
                    :
                    aplliedJobs?.length > 0 ?
                        aplliedJobs?.map((job: any) => (
                            <div
                                key={job?.id}
                                className="border rounded-[20px] p-5 min-h-[100px]"
                                onClick={() => { '' }}
                            >
                                <JobList job={job} appliedJob={'hh'} />
                            </div>
                        ))
                        :
                        <h4>No Jobs Applied yet</h4>
                }
            </div>
        </div>
    )
}

export default AppliedJobs