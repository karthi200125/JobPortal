import BottomDrawer from "@/components/BottomDrawer"
import JobDesc from "../Job/Job"
import JobList from "./JobList"

const JobLists = () => {
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* results */}
      <div className="z-10 sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
        <h5 className="text-sm font-bold">React js Developer <span className="font-normal text-xs"> in </span> India</h5>
        <h5 className="text-xs">100 Results</h5>
      </div>
      <>
        <div className="md:hidden">
          <BottomDrawer body={<JobDesc />}>
            <JobList isHover />
          </BottomDrawer>
        </div>
        <div className="hidden md:block">
          <JobList isHover />
        </div>
      </>
    </div>
  )
}

export default JobLists