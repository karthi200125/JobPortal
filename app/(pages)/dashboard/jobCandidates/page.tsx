import { FaSuitcase, FaUsers } from "react-icons/fa"
import { FaListCheck } from "react-icons/fa6"
import JobDescription from "../../jobs/Job/JobDescription"
import Candidates from "./Candidates"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const JobCandidates = () => {

    const options = [
        'EaryApplicants',
        'Top Applicants',
    ]

    const HandleChange = () => {

    }

    return (
        <div className="p-5 w-full h-screen relative flex flex-row items-start gap-5">

            <div className="flex-1 space-y-3">
                <h2>Full stack Developer</h2>
                <h4 className="text-[var(--textBlur)]"> Chennai , Tamilnadu , India . 3 months Ago . (100 applicants)</h4>
                <div className="flex flex-row gap-3 items-center">
                    <FaSuitcase size={20} />
                    <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">On Site</h5>
                    <h5 className=" bg-neutral-200 p-1 rounded-[5px] flexcenter px-3">Full Time</h5>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <FaListCheck size={20} />
                    <h5>10 skills match your profile - you may be a good fit</h5>
                </div>

                <JobDescription />

            </div>

            <div className="flex-1 border rounded-md p-5 space-y-5">
                <div className="flex flex-row items-center justify-between pb-5 borderb">
                    <div className="flex-1 flex flex-row items-center gap-3">
                        <FaUsers size={20} />
                        <h3 className="font-bold">Applied Candidates</h3>
                        (100)
                    </div>

                    <Select defaultValue={"earlyApplicants"}>
                        <SelectTrigger className={`w-full flex-1`}>
                            <SelectValue placeholder={"EaryApplicants"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {options?.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
                <Candidates />
            </div>

        </div>
    )
}

export default JobCandidates