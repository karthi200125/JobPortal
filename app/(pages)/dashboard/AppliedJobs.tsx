import JobList from "../jobs/JobLists/JobList"

const AppliedJobs = () => {
    return (
        <div className="w-full space-y-2 border rounded-[20px] p-5 min-h-[100px]">
            <h3 className="font-bold">Job You Applied (10)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="border rounded-[20px] p-5 min-h-[100px]">
                    <JobList more />
                </div>
                <div className="border rounded-[20px] p-5 min-h-[100px]">
                    <JobList more />
                </div>
                <div className="border rounded-[20px] p-5 min-h-[100px]">
                    <JobList more />
                </div>
            </div>
        </div>
    )
}

export default AppliedJobs