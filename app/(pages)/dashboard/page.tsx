'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoPlus } from 'react-icons/go';
import { IoIosPeople } from 'react-icons/io';
import { useSelector } from 'react-redux';

import Button from '@/components/Button';
import Title from '@/lib/MetaTitle';
import AppliedCounts from './AppliedCounts';
import ShowAll from './ShowAll';
import ShowJobs from './ShowJobs';

import { getUserById } from '@/actions/auth/getUserById';
import { getActionTakenJobs } from '@/actions/job/getActionTakensJobs';
import { getSavedJobs } from '@/actions/job/getSavedJobs';
import { getAppliedJobs } from '@/actions/jobapplication/getAppliedJobs';


interface User {
    id: number;
    role: 'CANDIDATE' | 'RECRUITER' | 'ORGANIZATION';
    postedJobs?: number[];
    savedJobs?: number[];
}

interface ReduxState {
    user: { user: User };
}

const Dashboard = () => {
    const user = useSelector((state: ReduxState) => state.user.user);
    const router = useRouter();
    const searchParams = useSearchParams();
    const paramValue = searchParams.keys().next().value;
    
    const isRecruiter = user?.role === 'RECRUITER';
    const isCandidate = user?.role === 'CANDIDATE';
    const isORG = user?.role === 'ORGANIZATION';

    const { data, isPending: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: () => user?.id ? getAppliedJobs(user.id) : Promise.resolve(null),
        enabled: !!user?.id,
    });

    const appliedJobs = data?.data

    const { data: userData, isPending: userLoading } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: () => user?.id ? getUserById(user.id) : Promise.resolve(null),
        enabled: !!user?.id,
    });

    const { data: savedJobs, isPending: savedJobsLoading } = useQuery({
        queryKey: ['getSavedJobs', user?.id],
        queryFn: () => user?.id ? getSavedJobs(user.id) : Promise.resolve(null),
        enabled: !!user?.id,
    });

    const { data: actionTakenJobs, isPending: actionTakenJobsLoading } = useQuery({
        queryKey: ['getActionTakenJobs', user?.id],
        queryFn: () => user?.id ? getActionTakenJobs(user.id) : Promise.resolve(null),
        enabled: !!user?.id,
    });

    if (userLoading) {
        return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen pt-5 space-y-5 px-2">
            <Title
                title={` ${paramValue || "Dashboard"} | JOBIFY`}
                description="Manage your job applications, postings, and interactions all in one place with JOBIFY's intuitive dashboard."
                keywords="dashboard, job management, applications, hiring, career tracking"
            />

            <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                    <h2 className='capitalize'>{`${paramValue || 'Dashboard'}`}</h2>
                    <div className="flex flex-row items-center gap-5">
                        {isORG && (
                            <Button
                                variant="border"
                                onClick={() => router.push('/dashboard/employees')}
                                icon={<IoIosPeople size={20} />}
                            >
                                Employees
                            </Button>
                        )}
                        {(isRecruiter || isORG) && (
                            <Button
                                variant="border"
                                onClick={() => router.push('/createJob')}
                                icon={<GoPlus size={20} />}
                            >
                                Create Job
                            </Button>
                        )}
                    </div>
                </div>

                {/* Applied Counts */}
                <AppliedCounts appliedJobs={appliedJobs} user={userData} />

                {paramValue && <div className="w-full h-[1px] bg-neutral-200 my-2"></div>}

                {/* show all */}
                {paramValue ?
                    <ShowAll
                        type={paramValue}
                        postedJobs={userData?.postedJobs}
                        appliedJobs={appliedJobs || []}
                        actionTaken={actionTakenJobs || []}
                        savedJobs={savedJobs || []}
                        isLoading={appliedJobsLoading || savedJobsLoading || actionTakenJobsLoading}
                    />
                    :
                    <div className="space-y-5">

                        {/* Applied Jobs (Only for Candidates) */}
                        {(isRecruiter || isCandidate) && (
                            <ShowJobs
                                Jobs={appliedJobs || []}
                                isLoading={appliedJobsLoading}
                                title="Applied Jobs"
                                href='/dashboard?appliedJobs'
                                type="applied"
                            />
                        )}

                        {/* Posted Jobs (Only for Recruiters & Organizations) */}
                        {(isRecruiter || isORG) && (
                            <ShowJobs
                                Jobs={userData?.postedJobs || []}
                                isLoading={userLoading}
                                title="Posted Jobs"
                                href='/dashboard?postedJobs'
                                type="posted"
                            />
                        )}

                        {/* Saved Jobs (Only for Recruiters & Candidate) */}
                        {(isRecruiter || isCandidate) && (
                            <ShowJobs
                                Jobs={savedJobs || []}
                                isLoading={savedJobsLoading}
                                title="Saved Jobs"
                                href='/dashboard?savedJobs'
                            />
                        )}
                    </div>
                }

            </div>

        </div>
    );
};

export default Dashboard;
