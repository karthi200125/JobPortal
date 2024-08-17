import AppliedCounts from "./AppliedCounts"
import AppliedJobs from "./AppliedJobs"

const JobStatus = () => {
    return (
        <div className="w-full min-h-screen pt-5 space-y-5 ">
            <AppliedCounts />
            <AppliedJobs />
        </div>
    )
}

export default JobStatus