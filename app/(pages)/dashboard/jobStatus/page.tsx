import JobList from "../../jobs/JobLists/JobList"
import StatusSide from "./StatusSide"

const JobStatus = () => {
    return (
        <div className="relative w-full h-screen p-5 space-y-5">

            <div className="w-full pb-5 borderb flex flex-row items-center justify-between">
                <div>
                    <h2>Job Application Status</h2>
                    <h6 className="text-[var(--lighttext)]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, a?</h6>
                </div>
                <div className="flex flex-row items-center gap-5">
                    <h1>100</h1>
                    <span className="h-[30px] w-[1px] bg-[var(--lighttext)]"></span>
                    <h4>Total Applies</h4>
                </div>
            </div>

            <div className="flex flex-row items-start gap-5">
                <div className="w-[40%] h-screen overflow-y-auto">
                    <JobList isHover />
                    <JobList isHover />
                    <JobList isHover />
                    <JobList isHover />
                    <JobList isHover />
                </div>
                <div className="w-[60%] h-screen space-y-5">
                    <StatusSide />
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <h3>Similar Jobs</h3>
                            <h6>You might be intrested</h6>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="border rounded-md ">
                                <JobList />
                            </div>
                            <div className="border rounded-md ">
                                <JobList />
                            </div>
                            <div className="border rounded-md ">
                                <JobList />
                            </div>
                            <div className="border rounded-md ">
                                <JobList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobStatus