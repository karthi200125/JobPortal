import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import noImage from '../../../../public/noImage.webp'
import JobCompanySkeleton from '@/Skeletons/JobCompanySkeleton'

const JobCompany = ({ company, isPending }: any) => {

  // console.log(company)

  return (
    <>
      {isPending ?
        <JobCompanySkeleton />
        :
        <div className='w-full border rounded-[10px] min-h-[100px] p-5 space-y-5'>
          <h3 className='font-bold'>About The Company</h3>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-row items-start gap-5'>
              <Image src={company?.companyImage || noImage.src} alt='' width={100} height={100} className='w-[100px] h-[100px] rounded-md' />
              <div className='space-y-1'>
                <h3 className='font-semibold capitalize'>{company?.companyName}</h3>
                <h4 className='font-bold'>12000 follwers</h4>
                <h6>{company?.companyTotalEmployees} Employees</h6>
              </div>
            </div>
            <Button variant='border' className='hidden md:block' icon={<GoPlus />}>Follow</Button>
          </div>
          <h4 className='text-[var(--lighttext)]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio maxime sit quas obcaecati pariatur aspernatur corrupti commodi odio reprehenderit culpa deserunt hic quae tempora quam sint, corporis atque magnam possimus, quod quaerat soluta quasi illum optio. Voluptates consequuntur ad, fugiat provident sapiente architecto enim debitis, quidem similique accusantium dolorum. Hic!</h4>
        </div>
      }
    </>
  )
}

export default JobCompany