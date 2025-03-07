'use client'

import FilterNavbar from "@/components/FilterNavbar/FilterNavbar"
import JobLists from "./JobLists/JobLists"
import JobDesc from "./Job/Job"
import { isPending } from "@reduxjs/toolkit"

interface Props {
    jobs?: any,
    job?: any,
    isPending?: boolean,
    onSelectedJob?: any,
    count?: number,
    currentPage?: number,
    safeSearchParams?: any
}

export default function Jobb({ jobs, job, count, currentPage, isPending, onSelectedJob , safeSearchParams }: Props) {
    return (
        <div>
            <FilterNavbar />
            <div className="w-full flex flex-row items-start">
                <div className="w-full md:w-[40%] jobsh overflow-y-auto">
                    <JobLists
                        Jobs={jobs}
                        isLoading={isPending}
                        onSelectedJob={onSelectedJob}
                        count={count}
                        currentPage={currentPage}
                    />
                </div>
                <div className="hidden md:block w-full md:w-[60%] overflow-y-auto jobsh">
                    <JobDesc
                        job={job}
                        safeSearchParams={safeSearchParams}
                    />
                </div>
            </div>
        </div>
    )
}