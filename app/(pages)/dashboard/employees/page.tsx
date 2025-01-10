'use client'

import Batch from "@/components/Batch"
import Image from "next/image"
import Link from "next/link"
import noAvatar from '../../../../public/noImage.webp'
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getCompaniesEmployees } from "@/actions/getCompanyEmployees"
import Button from "@/components/Button"
import { IoMdSend } from "react-icons/io"
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Employees = () => {

    const user = useSelector((state: any) => state.user.user);

    const { data: companyEmps = [], isLoading: companyEmpIsLoading } = useQuery({
        queryKey: ['getCompanyEmps'],
        queryFn: async () => getCompaniesEmployees(),
    });

    const { data: verificationEmps = [], isLoading: verifyEmpsIsLoading } = useQuery({
        queryKey: ['getVerificationEmps'],
        queryFn: async () => getCompaniesEmployees(),
    });

    console.log(companyEmps)

    return (
        <div className="w-full flex flex-col md:flex-row items-start p-5 gap-5 min-h-screen">

            {/* company employees */}
            <div className="flex-1 h-full w-full space-y-5">
                <h3>Company Employees (10)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                    {companyEmpIsLoading ?
                        "loading"
                        :
                        companyEmps.map((emp: any) => (
                            <Employee user={emp} key={emp?.id} isVerify={false} />
                        ))}
                </div>
            </div>

            {/* verification employees */}
            <div className="flex-1 h-full w-full space-y-5">
                <h3>Employees Verifications (10)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                    {verifyEmpsIsLoading ?
                        "loading"
                        :
                        verificationEmps.map((emp: any) => (
                            <Employee user={emp} key={emp?.id} isVerify={true} />
                        ))}
                </div>
            </div>

        </div>
    )
}

export default Employees


interface EmployeeProps {
    user: any,
    isVerify?: boolean
}

export const Employee = ({ user, isVerify }: EmployeeProps) => {
    return (
        <Link href={`/userProfile/${user?.id}`} className="flex flex-row items-start gap-5 p-2 md:p-5 border-[1px] border-solid border-neutral-200 rounded-lg overflow-hidden">
            <Image
                src={user?.userImage || noAvatar.src}
                alt={user?.username || 'No Avatar'}
                width={50}
                height={50}
                className="bg-neutral-200 rounded-lg object-cover"
            />
            <div className="space-y-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="font-bold cursor-pointer trans">
                        {user?.username}
                    </div>
                    {user?.isPro && <Batch type="premium" />}
                </div>
                <h5 className="text-neutral-500">{user?.profession}</h5>
                {isVerify &&
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="border"
                            icon={<FaCheckCircle size={15} className="text-green-400" />}
                            className="!h-[30px] !border-green-400 text-green-500 !pl-2"
                        >
                            Accept
                        </Button>
                        <Button
                            variant="border"
                            icon={<MdCancel size={15} className="text-red-500" />}
                            className="!h-[30px] !border-red-500 text-red-500 !pl-2"
                        >
                            Reject
                        </Button>
                    </div>
                }
            </div>
        </Link>
    )
}