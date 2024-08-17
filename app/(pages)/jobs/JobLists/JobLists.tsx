import JobList from "./JobList"

const JobLists = () => {
  return (
    <div className="relative w-[40%] h-full overflow-y-auto">

      {/* results */}
      <div className="z-10 sticky top-0 left-0 w-full max-h-max bg-[var(--voilet)] text-white space-y-1 p-5">
        <h5 className="text-sm font-bold">React js Developer <span className="font-normal text-xs"> in </span> India</h5>
        <h5 className="text-xs">100 Results</h5>
      </div>

      <JobList />
      <JobList />
      <JobList />
      <JobList />
    </div>
  )
}

export default JobLists