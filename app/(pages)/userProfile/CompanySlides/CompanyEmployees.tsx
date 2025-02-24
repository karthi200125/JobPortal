'use client'

import { getCompaniesEmployees } from "@/actions/getCompanyEmployees"
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton"
import { useQuery } from "@tanstack/react-query"
import { memo } from "react"
import Employee from "../../dashboard/employees/Employee"

const CompanyEmployees = ({ profileUser }: any) => {

  const { data = [], isPending } = useQuery({
    queryKey: ['getCompanyEmps', profileUser?.employees],
    queryFn: async () => await getCompaniesEmployees(profileUser?.employees),
  });

  console.log('empoyess companuy', profileUser)

  return (
    <div className="p-2 md:p-5 border rounded-[10px]">
      {isPending ? (
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