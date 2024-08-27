import React from 'react';
import { LuUsers } from "react-icons/lu";
import { LiaListSolid } from "react-icons/lia";
import { MdOutlinePendingActions } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/actions/auth/getUserById';
import { useParams } from 'next/navigation';

const AppliedCounts = () => {

    const params = useParams()
    const userId = Number(params?.userId)

    const { data: user, isPending } = useQuery({
        queryKey: ['getuser', userId],
        queryFn: async () => await getUserById(userId),
    });

    const isCandidate = user?.role === 'CANDIDATE'
    const isOrganize = user?.role === 'ORGANIZATION'
    const isRecruiter = user?.role === 'RECRUITER'

    const jobsCount = ''
    const jobsSubtitle = '"See jobs that you posted" : "See the jobs you applied to"'

    const Analysis = [
        {
            id: 1,
            icon: <LuUsers size={25} />,
            title: "Profile Views",
            count: 100,
            subtitle: "Discover who viewed your profile",
        },
        {
            id: 2,
            icon: <LiaListSolid size={25} />,
            title: isCandidate ? "Applied Jobs" : "Posted Jobs",
            count: jobsCount,
            subtitle: jobsSubtitle
        },
        {
            id: 3,
            icon: <MdOutlinePendingActions size={25} />,
            title: "Actions Taken",
            count: 10,
            subtitle: "Review the jobs that took action",
        },
    ];

    return (
        <div className='w-full max-h-max flex flex-col md:flex-row items-center justify-between gap-5'>
            {Analysis?.map((analysisItem) => (
                <div key={analysisItem.id} className='border rounded-[20px] p-5 h-full w-full md:flex-1 flex flex-col items-start gap-5'>
                    <div className='flex flex-row items-center gap-5'>
                        {analysisItem.icon}
                        <h3>{analysisItem.title}</h3>
                    </div>
                    <div className='flex flex-row items-start justify-between gap-10'>
                        <h1>{analysisItem.count}</h1>
                        <span className='h-[50px] w-[1px] bg-neutral-200'></span>
                        <h5 className='text-[var(--lighttext)]'>{analysisItem.subtitle}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AppliedCounts;
