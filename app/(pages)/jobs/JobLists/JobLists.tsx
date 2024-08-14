import JobList from "./JobList"

const JobLists = () => {
  return (
    <div className="w-[40%] h-full overflow-y-auto">
      <JobList />
      <JobList />
      <JobList />
      <JobList />      
    </div>
  )
}

export default JobLists