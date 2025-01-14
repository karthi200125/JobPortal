'use client'

import React, { useState } from 'react'
import AboutCompanyProfile from './AboutCompanyProfile'
import CompanyEmployees from './CompanyEmployees'
import CompanyJobProfile from './CompanyJobProfile'

const CompanySlides = ({ company }: any) => {
    const [tab, setTab] = useState("Home")

    const companySlides = [
        {
            id: 1,
            title: "Home",
        },
        {
            id: 2,
            title: "Employees",
        },
        {
            id: 3,
            title: "Jobs",
        },
    ]

    let tabContent;
    if (tab === "Home") {
        tabContent = <AboutCompanyProfile />
    }
    if (tab === "Employees") {
        tabContent = <CompanyEmployees company={company} />
    }
    if (tab === "Jobs") {
        tabContent = <CompanyJobProfile company={company} />
    }

    return (
        <div className='w-full max-h-max space-y-5'>
            <div className='w-full flex flex-row items-center rounded-md pl-5'>
                {companySlides?.map((cs) => (
                    <div
                        onClick={() => setTab(cs?.title)}
                        className={`max-w-max px-5 py-2 ${tab === cs?.title && "border-b-[2px] border-solid border-black"} trans hover:opacity-50 cursor-pointer`}
                        key={cs?.id}
                    >
                        {cs?.title}
                    </div>
                ))}
            </div>
            <div className='w-full max-h-max'>
                {tabContent}
            </div>
        </div>
    )
}

export default CompanySlides