'use client';

import { getUserById } from "@/actions/auth/getUserById";
import { checkSkills } from "@/actions/job/CompareSkills";
import { AcceptOrRemove } from "@/actions/jobapplication/acceptOrRemove";
import { openModal } from "@/app/Redux/ModalSlice";
import Button from "@/components/Button";
import Model from "@/components/Model/Model";
import { useCustomToast } from "@/lib/CustomToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import noProfile from "../../../../public/noProfile.webp";
import JobCandidate from "./JobCandidate";
import { Skeleton } from "@/components/ui/skeleton";

const Candidates = ({ job, candidates, isPending }: any) => {
    const [canId, setCanId] = useState<string>("");

    const memoizedCandidates = useMemo(() => candidates, [candidates]);

    return (
        <div className="w-full flex flex-col gap-1">
            <Model
                bodyContent={<JobCandidate userId={canId} job={job} />}
                title="Job Applicant Profile"
                className="w-full md:w-[800px]"
                modalId="jobcandidatemodal"
            >
                <div></div>
            </Model>

            {isPending ? (
                <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="bg-neutral-200 h-[100px] rounded-[10px]" />
                    ))}
                </div>
            ) : memoizedCandidates.length === 0 ? (
                "No Candidates Yet!"
            ) : (
                memoizedCandidates.map((can: any) => (
                    <Candidate key={can.id} can={can} setCanId={setCanId} jobId={job?.id} job={job} />
                ))
            )}
        </div>
    );
};

export default Candidates;

const Candidate = ({ can, setCanId, jobId, job }: any) => {
    const dispatch = useDispatch();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const queryClient = useQueryClient();
    const [loadingAction, setLoadingAction] = useState<"accept" | "remove" | null>(null);

    // Open modal with selected candidate ID
    const handleOpenModal = useCallback(() => {
        setCanId(can.userId);
        dispatch(openModal("jobcandidatemodal"));
    }, [can.userId, setCanId, dispatch]);

    const { data } = useQuery({
        queryKey: ["getCompareSkills", can, job],
        queryFn: async () => checkSkills(can, job),
    });

    const { data: user } = useQuery({
        queryKey: ["getUser", can?.user?.id],
        queryFn: async () => getUserById(can?.user?.id),
    });

    const jobApplication = user?.jobApplications.find((jb: any) => jb.jobId === job.id && jb?.userId === user?.id);

    // Accept or remove candidate
    const handleAcceptOrRemove = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>, action: "accept" | "remove") => {
            e.stopPropagation();
            setLoadingAction(action);

            try {
                const data = await AcceptOrRemove(jobApplication?.id, action);
                if (data?.success) {
                    showSuccessToast(data.success);
                    queryClient.invalidateQueries({ queryKey: ["getJobApplicationCandidates", jobId] });
                }
                if (data?.error) {
                    console.log(data?.error)
                    showErrorToast(data?.error)
                }
            } finally {
                setLoadingAction(null);
            }
        },
        [can.id, jobId, queryClient, showSuccessToast]
    );


    return (
        <div
            className="w-full py-2 px-3 rounded-md hover:bg-neutral-100 flex flex-row items-start gap-5 cursor-pointer"
            onClick={handleOpenModal}
        >
            {/* Profile Image */}
            <div className="w-[80px] h-[80px] rounded-md bg-neutral-200 overflow-hidden relative">
                <Image
                    src={user?.userImage || noProfile.src}
                    alt="User Profile"
                    fill
                    className="rounded-md bg-neutral-200 w-full h-full object-cover absolute top-0 left-0"
                />
            </div>

            {/* Candidate Info */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
                <div className="flex flex-col items-start gap-1">
                    <h4 className="font-bold capitalize">{user?.username}</h4>
                    <h4 className="px-2 py-1 rounded-md bg-green-100 text-green-600 text-xs font-semibold">
                        Skills Match: {data?.per}%
                    </h4>
                    <h4>Exp: Fresher</h4>
                    {user?.city && <h4>{user?.city}, {user?.state}</h4>}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center gap-5">
                    <Button
                        onClick={(e: any) => handleAcceptOrRemove(e, "accept")}
                        variant="border"
                        icon={<FaCheck size={15} />}
                        isLoading={loadingAction === "accept"}
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={(e: any) => handleAcceptOrRemove(e, "remove")}
                        variant="border"
                        icon={<RiCloseFill size={15} />}
                        isLoading={loadingAction === "remove"}
                    >
                        Not Interested
                    </Button>
                </div>
            </div>
        </div>
    );
};

