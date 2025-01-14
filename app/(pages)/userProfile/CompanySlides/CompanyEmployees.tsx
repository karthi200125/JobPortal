'use client'

import { getCompaniesEmployees } from "@/actions/getCompanyEmployees"
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton"
import { useQuery } from "@tanstack/react-query"
import Employee from "../../dashboard/employees/Employee"
import { getUserById } from "@/actions/auth/getUserById"
import { memo } from "react"

const CompanyEmployees = ({ company }: { company: any }) => {

  const { data: user, isPending: userPending } = useQuery({
    queryKey: ['getUser', company?.userId],
    queryFn: async () => await getUserById(company?.userId),
  });

  const { data = [], isPending } = useQuery({
    queryKey: ['getCompanyEmps', user?.employee],
    queryFn: async () => await getCompaniesEmployees(user?.employees),
  });

  return (
    <div className="p-2 md:p-5 border rounded-[10px]">
      {(userPending || isPending) ? (
        <EmployeesSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {data?.length > 0 ? (
            data.map((emp: any) => (
              <Employee user={emp} key={emp.id} isVerify={false} />
            ))
          ) : (
            <h3 className="text-neutral-500 text-sm">No Employees yet!</h3>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(CompanyEmployees)