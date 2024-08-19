import Button from "@/components/Button"
import AppliedCounts from "./AppliedCounts"
import AppliedJobs from "./AppliedJobs"
import { GoPlus } from "react-icons/go"
import Model from "@/components/Model/Model"
import CreateJobForm from "@/app/Forms/CreateJobForm"

const JobStatus = () => {
    return (
        <div className="w-full min-h-screen pt-5 space-y-5 ">
            <div className="flex flex-row items-center justify-between">
                <h2 className="">Dashboard</h2>
                <Model
                    bodyContent={<CreateJobForm />}
                    title='Create New Job'
                    className='!w-[1200px]'
                    desc="create you job"
                >
                    <Button variant="border" icon={<GoPlus size={20} />}>Create Job</Button>
                </Model>

            </div>
            <AppliedCounts />
            <AppliedJobs />
        </div>
    )
}

export default JobStatus