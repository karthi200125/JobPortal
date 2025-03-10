'use client';

import { getCompanyVerifyEmployees } from "@/actions/company/getCompanyVerifyEmployees";
import { getCompaniesEmployees } from "@/actions/getCompanyEmployees";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Employee from "./Employee";

const Employees = () => {
    const user = useSelector((state: any) => state.user.user);

    const { data: companyEmps = [], isLoading: companyEmpIsLoading } = useQuery({
        queryKey: ['getCompanyEmps', user?.employees],
        queryFn: async () => await getCompaniesEmployees(user?.employees),
        enabled: !!user?.employees,
    });

    const { data: verificationEmps = [], isLoading: verifyEmpsIsLoading } = useQuery({
        queryKey: ['getVerificationEmps', user?.verifyEmps],
        queryFn: async () => await getCompanyVerifyEmployees(user?.verifyEmps),
        enabled: !!user?.verifyEmps,
    });

    if (!user) {
        return <EmployeesSkeleton />;
    }

    return (
        <div className="w-full flex flex-col lg:flex-row items-start py-5 gap-5 min-h-screen">

            {/* Verification Employees */}
            <div className="flex-1 max-h-max w-full space-y-5 p-5 border rounded-[20px]">
                <h3>Employees Verifications ({user?.verifyEmps?.length || 0})</h3>
                {verifyEmpsIsLoading ? (
                    <EmployeesSkeleton />
                ) : (
                    <div className="space-y-2 w-full">
                        {verificationEmps.length > 0 ? (
                            verificationEmps.map((emp: any) => (
                                <Employee user={emp} key={emp.id} isVerify={true} />
                            ))
                        ) : (
                            <h3 className="text-neutral-500 text-sm">No Verification Employees yet!</h3>
                        )}
                    </div>
                )}
            </div>

            {/* Company Employees */}
            <div className="flex-1 max-h-max w-full space-y-5 p-5 border rounded-[20px]">
                <h3>Company Employees ({user?.employees?.length || 0})</h3>
                {companyEmpIsLoading ? (
                    <EmployeesSkeleton />
                ) : (
                    <div className="space-y-2 w-full">
                        {companyEmps.length > 0 ? (
                            companyEmps.map((emp: any) => (
                                <Employee user={emp} key={emp.id} isVerify={false} />
                            ))
                        ) : (
                            <h3 className="text-neutral-500 text-sm">No Employees yet!</h3>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Employees;
