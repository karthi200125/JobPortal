import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton"
import { NetworkUser } from "../network/page"
import JobListsSkeleton from "@/Skeletons/JobListsSkeleten";
import JobList from "../jobs/JobLists/JobList";
import { useQuery } from "@tanstack/react-query";
import { getWhoViewedYourProfile } from "@/actions/premiumFeatures/getWhoviwedYouProfile";
import { useSelector } from "react-redux";

interface ShowAllProps {
    type?: string,
    postedJobs?: any,
    appliedJobs?: any,
    actionTaken?: any,
    isLoading?: boolean,
}

const ShowAll = ({ type, postedJobs, appliedJobs, actionTaken, isLoading }: ShowAllProps) => {

    const user = useSelector((state: any) => state.user.user);

    let jobs;

    if (type === "appliedJobs") jobs = appliedJobs
    if (type === "postedJobs") jobs = postedJobs
    if (type === "actionTaken") jobs = actionTaken

    const { data: profileViewUsers, isPending } = useQuery({
        queryKey: ["getWhoViewedYourProfile", user?.ProfileViews],
        queryFn: async () => await getWhoViewedYourProfile(user?.ProfileViews),
        enabled: user?.ProfileViews.length > 0,
    });

    return (
        <div className="w-full min-h-screen">
            {type === 'profileViews' ?
                <div className="max-h-max space-y-3">
                    {isPending ? (
                        <EmployeesSkeleton />
                    ) : profileViewUsers?.length === 0 ? (
                        <div>No Profile View users found</div>
                    ) : (
                        profileViewUsers?.map((user: any) => <NetworkUser key={user.id} networkUser={user} />)
                    )}
                </div>
                :
                <div>
                    {isLoading ?
                        <JobListsSkeleton isDash />
                        :
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {jobs?.length > 0 ?
                                jobs?.slice(0, 4).map((job: any) => (
                                    <div
                                        key={job?.id}
                                        className="border rounded-[20px] p-2 md:p-5 min-h-[100px]"
                                        onClick={() => { '' }}
                                    >
                                        <JobList
                                            job={job}
                                            appliedJob={'hh'}
                                            app_or_pos={type === 'appliedJobs' ? "applied" : 'posted'}
                                        />
                                    </div>
                                ))
                                :
                                <h4>{type === 'appliedJobs' ? "No Jobs Applied yet" : "No Jobs posted yet"}</h4>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ShowAll