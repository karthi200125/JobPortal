'use client';

import { getCompanyVerifyEmployees } from "@/actions/company/getCompanyVerifyEmployees";
import { getCompaniesEmployees } from "@/actions/getCompanyEmployees";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Employee from "./Employee";
import { Suspense } from "react";

const Employees = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data: companyEmps = [], isLoading: companyEmpIsLoading } = useQuery({
        queryKey: ['getCompanyEmps', user.employees],
        queryFn: async () => await getCompaniesEmployees(user.employees)
    });

    const { data: verificationEmps = [], isLoading: verifyEmpsIsLoading } = useQuery({
        queryKey: ['getVerificationEmps', user.verifyEmps],
        queryFn: async () => await getCompanyVerifyEmployees(user.verifyEmps)
    });

    return (
        <div className="w-full flex flex-col md:flex-row items-start p-5 gap-5 min-h-screen">
            {/* Company Employees */}
            <div className="flex-1 min-h-screen w-full space-y-5 border-r-[1px] border-solid border-neutral-200 ">
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
                            <h3 className="text-neutral-500 text-sm">No Employees yet!</h3>
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
                            <h3 className="text-neutral-500 text-sm">No Verification Employees yet!</h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Wrap the Employees component in Suspense for data fetching
const SuspendedEmployees = () => (
    <Suspense fallback={<EmployeesSkeleton />}>
        <Employees />
    </Suspense>
);

export default SuspendedEmployees;
