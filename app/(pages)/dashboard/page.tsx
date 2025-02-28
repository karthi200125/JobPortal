'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { IoIosPeople } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';

import Button from '@/components/Button';
import AppliedCounts from './AppliedCounts';
import AppliedJobs from './AppliedJobs';
import PostedJobs from './PostedJobs';
import Title from '@/lib/MetaTitle';
import ShowAll from './ShowAll';

import { getAppliedJobs } from '@/actions/jobapplication/getAppliedJobs';
import { getUserById } from '@/actions/auth/getUserById';

// Type Definitions
interface User {
    id: string;
    role: 'CANDIDATE' | 'RECRUITER' | 'ORGANIZATION';
    postedJobs?: any[];
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

    const { data: appliedJobs, isPending: appliedJobsLoading } = useQuery({
        queryKey: ['getAppliedJobs', user?.id],
        queryFn: () => getAppliedJobs(user?.id),
        enabled: !!user?.id,
    });

    const { data: userData, isPending: userLoading } = useQuery({
        queryKey: ['getUser', user?.id],
        queryFn: () => getUserById(user?.id),
        enabled: !!user?.id,
    });

    const actionTakens: any = [];

    if (userLoading) {
        return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen pt-5 space-y-5 px-2">
            <Title
                title="Dashboard | JOBIFY"
                description="Manage your job applications, postings, and interactions all in one place with JOBIFY's intuitive dashboard."
                keywords="dashboard, job management, applications, hiring, career tracking"
            />

            {paramValue ? (
                <div className="space-y-5">
                    <h2 className="capitalize">{paramValue}</h2>
                    <ShowAll
                        type={paramValue}
                        postedJobs={userData?.postedJobs}
                        appliedJobs={appliedJobs?.data}
                        actionTaken={actionTakens}
                        isLoading={(appliedJobsLoading || userLoading)}
                    />
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                        <h2>Dashboard</h2>
                        <div className="flex flex-row items-center gap-5">
                            {(isRecruiter || isORG) && (
                                <Button variant="border" onClick={() => router.push('/dashboard/employees')} icon={<IoIosPeople size={20} />}>
                                    Employees
                                </Button>
                            )}
                            {(isRecruiter || isORG) && (
                                <Button variant="border" onClick={() => router.push('/createJob')} icon={<GoPlus size={20} />}>
                                    Create Job
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Applied Counts */}
                    <AppliedCounts appliedJobs={appliedJobs?.data} user={userData} />

                    {/* Applied Jobs (Only for Candidates) */}
                    {!isORG && <AppliedJobs appliedJobs={appliedJobs?.data} isLoading={appliedJobsLoading} />}

                    {/* Posted Jobs (Only for Recruiters & Organizations) */}
                    {!isCandidate && <PostedJobs postedJobs={userData?.postedJobs} isLoading={userLoading} user={userData} />}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
