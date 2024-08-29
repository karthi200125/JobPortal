'use client'

import Batch from "@/components/Batch"
import Image from "next/image"
import noAvatar from '../../../../public/noProfile.webp'
import { useQuery } from "@tanstack/react-query"
import { getCompaniesEmployees } from "@/actions/getCompanyEmployees"

const CompanyEmployees = () => {

  const companyId = 1
  const { data = [], isPending } = useQuery({
    queryKey: ['getCompanyEmployyes'],
    queryFn: async () => await getCompaniesEmployees(),
  });

  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {data?.map((emp: any) => (
        <div key={emp?.id} className='flex flex-row items-start gap-5 border p-5 rounded-md'>

          <Image src={emp?.userImage || noAvatar.src} alt='' width={50} height={50} className='bg-neutral-200 rounded-full' />
          <div className='space-y-2'>
            <div className='flex flex-row items-center gap-3'>
              <h4 className='font-bold'>{emp?.username}</h4>
              {emp?.isPro &&
                <Batch type='premium' />
              }
            </div>
            <h5>{emp?.profession} </h5>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyEmployees