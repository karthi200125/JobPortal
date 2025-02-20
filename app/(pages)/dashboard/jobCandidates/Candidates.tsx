'use client';

import { openModal } from "@/app/Redux/ModalSlice";
import Button from "@/components/Button";
import Model from "@/components/Model/Model";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import noProfile from "../../../../public/noProfile.webp";
import JobCandidate from "./JobCandidate";
import { useState, useCallback, useTransition, useMemo } from "react";
import { useCustomToast } from "@/lib/CustomToast";
import { useQueryClient } from "@tanstack/react-query";
import { AcceptOrRemove } from "@/actions/jobapplication/acceptOrRemove";

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
                "Loading..."
            ) : memoizedCandidates.length === 0 ? (
                "No Candidates Yet!"
            ) : (
                memoizedCandidates.map((can: any) => (
                    <Candidate key={can.id} can={can} setCanId={setCanId} jobId={job?.id} />
                ))
            )}
        </div>
    );
};

export default Candidates;

const Candidate = ({ can, setCanId, jobId }: any) => {
    const dispatch = useDispatch();
    const [isLoading, startTransition] = useTransition();
    const { showSuccessToast } = useCustomToast();
    const queryClient = useQueryClient();

    // Open modal with selected candidate ID
    const handleOpenModal = useCallback(() => {
        setCanId(can.id);
        dispatch(openModal("jobcandidatemodal"));
    }, [can.id, setCanId, dispatch]);

    // Accept or remove candidate
    const handleAcceptOrRemove = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, action: "accept" | "remove") => {
            e.stopPropagation();
            startTransition(() => {
                AcceptOrRemove(can.id, jobId, action).then((data) => {
                    if (data?.success) {
                        showSuccessToast(data.success);
                        queryClient.invalidateQueries({ queryKey: ["getJobApplicationCandidates", jobId] });
                    }
                });
            });
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
                    src={can?.user?.userImage || noProfile.src}
                    alt="User Profile"
                    fill
                    className="rounded-md bg-neutral-200 w-full h-full object-cover absolute top-0 left-0"
                />
            </div>

            {/* Candidate Info */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
                <div className="flex flex-col items-start">
                    <h4 className="font-bold">{can?.user?.username}</h4>
                    <h4>{can?.candidateEmail}</h4>
                    <h4 className="text-[var(--lighttext)]">{can?.user?.profession}</h4>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center gap-5">
                    <Button
                        onClick={(e: any) => handleAcceptOrRemove(e, "accept")}
                        variant="border"
                        icon={<FaCheck size={15} />}
                        isLoading={isLoading}
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={(e: any) => handleAcceptOrRemove(e, "remove")}
                        variant="border"
                        icon={<RiCloseFill size={15} />}
                        isLoading={isLoading}
                    >
                        Not Interested
                    </Button>
                </div>
            </div>
        </div>
    );
};
