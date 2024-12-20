'use client'

import JobProgress from "./JobProgress"

const StatusSide = ({ job }: any) => {

    const currentStep = 2;

    console.log("staus side", job)

    return (
        <>        
            <div className="w-full h-full p-5 space-y-5">

                <div className="space-y-2 borderb pb-5">
                    <h2 className="capitalize">{job?.jobTitle}</h2>
                    <h4 className="uppercase">{job?.company?.companyName}</h4>
                </div>

                <div className="space-y-2">
                    <h3>Application Status</h3>
                    <div className="w-full border p-5 overflow-x-auto rounded-md">
                        <JobProgress currentStep={currentStep} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3>Activity on this job</h3>
                    <div className="max-w-max border p-5 rounded-md flex flex-row items-center gap-10">
                        <div>
                            <h4>Total Applicants for this job</h4>
                            <h3 className="font-bold">1000</h3>
                        </div>
                        <span className="h-[40px] w-[1px] bg-neutral-200"></span>
                        <div className="">
                            <h4>Total Applicants for this job</h4>
                            <h3 className="font-bold">1000</h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default StatusSide