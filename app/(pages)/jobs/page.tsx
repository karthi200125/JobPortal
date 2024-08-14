import FilterNavbar from '@/components/FilterNavbar/FilterNavbar'
import React from 'react'
import JobLists from './JobLists/JobLists'
import JobDesc from './JobDesc/JobDesc'

const Jobs = () => {
    return (
        <div className='w-full'>
            <FilterNavbar />
            <div className='w-full jobsh flex flex-row items-start'>
                <JobLists />
                <JobDesc />
            </div>
        </div>
    )
}

export default Jobs