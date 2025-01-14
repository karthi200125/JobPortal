'use client'

import { memo } from 'react';
import JobList from '../../jobs/JobLists/JobList';

const CompanyJobProfile = ({ company }: any) => {

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
            {company?.jobs?.map((job: any) => (
                <div key={job?.id} className="border rounded-md p-5">
                    <JobList job={job} />
                </div>
            ))}
        </div>
    )
}

export default memo(CompanyJobProfile)