'use client'

import { employeeAccept, employeeReject } from "@/actions/company/employeeAction";
import { loginRedux } from "@/app/Redux/AuthSlice";
import Button from "@/components/Button";
import { useCustomToast } from "@/lib/CustomToast";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { memo, useTransition } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from "../../../../public/noImage.webp";
import Batch from "@/components/Batch";

interface EmployeeProps {
    user: any;
    isVerify?: boolean;
}

const Employee = ({ user, isVerify }: EmployeeProps) => {
    const currentUser = useSelector((state: any) => state.user.user);
    const userId = currentUser?.id;
    const empId = user?.id;
    const queryClient = useQueryClient();
    const [isAcceptPending, startAcceptTransition] = useTransition()
    const [isRejectPending, startRejectTransition] = useTransition()
    const dispatch = useDispatch();

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const AcceptEmp = () => {
        startAcceptTransition(() => {
            employeeAccept(empId, userId)
                .then((data: any) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getCompanyEmps', currentUser?.employees] });
                        queryClient.invalidateQueries({ queryKey: ['getVerificationEmps', currentUser?.verifyEmps] });
                        showSuccessToast(data?.success);
                        dispatch(loginRedux(data?.data))
                    }
                    if (data?.error) {
                        showErrorToast(data?.error);
                    }
                })
        })
    };

    const RejectEmp = () => {
        startRejectTransition(() => {
            employeeReject(empId, userId)
                .then((data: any) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getVerificationEmps', currentUser.verifyEmps] });
                        showSuccessToast(data?.success);
                        dispatch(loginRedux(data?.data))
                    }
                    if (data?.error) {
                        showErrorToast(data?.error);
                    }
                })
        })
    };

    return (
        <div
            className="w-full flex flex-row items-start gap-5 overflow-hidden p-2 border rounded-md"
        >
            <Image
                src={user?.userImage || noAvatar.src}
                alt={user?.username || "No Avatar"}
                width={50}
                height={50}
                className="bg-neutral-200 rounded-lg object-cover"
            />
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-2">
                    <div className="flex flex-row items-center gap-2">
                        <Link href={`/userProfile/${user?.id}`} className="font-bold cursor-pointer">{user?.username}</Link>
                        {user?.isPro && <Batch type="premium" />}
                    </div>
                    <h5 className="text-neutral-500">{user?.profession}</h5>
                </div>
                {isVerify && (
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="border"
                            icon={<FaCheckCircle size={15} className="text-green-400" />}
                            className="!h-[30px] !border-green-400 text-green-500 !pl-2"
                            onClick={AcceptEmp}
                            isLoading={isAcceptPending}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="border"
                            icon={<MdCancel size={15} className="text-red-500" />}
                            className="!h-[30px] !border-red-500 text-red-500 !pl-2"
                            onClick={RejectEmp}
                            isLoading={isRejectPending}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Employee);