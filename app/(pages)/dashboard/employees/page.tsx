'use client';

import Batch from "@/components/Batch";
import Image from "next/image";
import Link from "next/link";
import noAvatar from "../../../../public/noImage.webp";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompaniesEmployees } from "@/actions/getCompanyEmployees";
import Button from "@/components/Button";
import { IoMdSend } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getCompanyVerifyEmployees } from "@/actions/company/getCompanyVerifyEmployees";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { employeeAccept, employeeReject } from "@/actions/company/employeeAction";
import { useCustomToast } from "@/lib/CustomToast";

const Employees = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data: companyEmps = [], isLoading: companyEmpIsLoading } = useQuery({
        queryKey: ['getCompanyEmps'],
        queryFn: async () => {
            if (!user?.employees?.length) return [];
            return await getCompaniesEmployees(user.employees);
        },
    });

    const { data: verificationEmps = [], isLoading: verifyEmpsIsLoading } = useQuery({
        queryKey: ['getVerificationEmps'],
        queryFn: async () => {
            if (!user?.verifyEmps?.length) return [];
            return await getCompanyVerifyEmployees(user.verifyEmps);
        },
    });

    return (
        <div className="w-full flex flex-col md:flex-row items-start p-5 gap-5 min-h-screen">
            {/* Company Employees */}
            <div className="flex-1 h-full w-full space-y-5">
                <h3>Company Employees ({user?.employees?.length || 0})</h3>
                {companyEmpIsLoading ? (
                    <EmployeesSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                        {companyEmps?.length > 0 ? (
                            companyEmps.map((emp: any) => (
                                <Employee user={emp} key={emp.id} isVerify={false} />
                            ))
                        ) : (
                            <h3>No Employees yet!</h3>
                        )}
                    </div>
                )}
            </div>

            {/* Verification Employees */}
            <div className="flex-1 h-full w-full space-y-5">
                <h3>Employees Verifications ({user?.verifyEmps?.length || 0})</h3>
                {verifyEmpsIsLoading ? (
                    <EmployeesSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                        {verificationEmps?.length > 0 ? (
                            verificationEmps.map((emp: any) => (
                                <Employee user={emp} key={emp.id} isVerify={true} />
                            ))
                        ) : (
                            <h3>No Verification Employees yet!</h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employees;

interface EmployeeProps {
    user: any;
    isVerify?: boolean;
}

export const Employee = ({ user, isVerify }: EmployeeProps) => {
    const currentUser = useSelector((state: any) => state.user.user);
    const userId = currentUser?.id;
    const empId = user?.id;
    const queryClient = useQueryClient();

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const AcceptEmp = async () => {
        try {
            const empAccept = await employeeAccept(empId, userId);
            queryClient.invalidateQueries({ queryKey: ['getCompanyEmps'] });
            queryClient.invalidateQueries({ queryKey: ['getVerificationEmps'] });
            showSuccessToast(empAccept?.success || "Employee accepted successfully");
        } catch (err) {
            showErrorToast("Failed to accept employee");
            console.error(err);
        }
    };

    const RejectEmp = async () => {
        try {
            const empReject = await employeeReject(empId, userId);
            queryClient.invalidateQueries({ queryKey: ['getVerificationEmps'] });
            showSuccessToast(empReject?.success || "Employee rejected successfully");
        } catch (err) {
            showErrorToast("Failed to reject employee");
            console.error(err);
        }
    };

    return (
        <Link
            href={`/userProfile/${user?.id}`}
            className="flex flex-row items-start gap-5 p-2 md:p-5 border-[1px] border-solid border-neutral-200 rounded-lg overflow-hidden"
        >
            <Image
                src={user?.userImage || noAvatar.src}
                alt={user?.username || "No Avatar"}
                width={50}
                height={50}
                className="bg-neutral-200 rounded-lg object-cover"
            />
            <div className="space-y-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="font-bold cursor-pointer">{user?.username}</div>
                    {user?.isPro && <Batch type="premium" />}
                </div>
                <h5 className="text-neutral-500">{user?.profession}</h5>
                {isVerify && (
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="border"
                            icon={<FaCheckCircle size={15} className="text-green-400" />}
                            className="!h-[30px] !border-green-400 text-green-500 !pl-2"
                            onClick={AcceptEmp}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="border"
                            icon={<MdCancel size={15} className="text-red-500" />}
                            className="!h-[30px] !border-red-500 text-red-500 !pl-2"
                            onClick={RejectEmp}
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </div>
        </Link>
    );
};
