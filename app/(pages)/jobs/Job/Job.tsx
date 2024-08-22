import CompanyDetails from "./JobCompany";
import JobPremium from "./JobPremium";
import JobDescription from "./JobDescription";
import JobTitles from "./JobTitles";
import JobRecruiter from "./JobRecruiter";

const JobDesc = () => {
    return (
        <div className="w-full h-full overflow-y-auto p-5 space-y-5">
            <JobTitles />
            <JobRecruiter />
            <JobDescription />
            <JobPremium />
            <CompanyDetails />
        </div>
    )
}

export default JobDesc