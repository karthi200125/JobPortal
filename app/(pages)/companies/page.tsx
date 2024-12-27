'use client'

import Image from 'next/image'
import React from 'react'
import noImage from '../../../public/noImage.webp'
import { FaPerson } from 'react-icons/fa6'
import { FaSuitcase } from 'react-icons/fa'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '@/actions/company/getCompanies'
import ComapniesSkeleton from '@/Skeletons/ComapniesSkeleton'

const Companies = () => {

    const { data, isPending } = useQuery({
        queryKey: ['getCompanies'],
        queryFn: async () => await getCompanies(),
    });

    return (
        <div className='w-full min-h-screen py-5 space-y-5'>
            <h2 className='font-bold'>All Companies</h2>
            {isPending ?
                <ComapniesSkeleton />
                :
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {data?.map((company: any) => (
                        <Link key={company?.id} href={`/jobs?${company?.companyName}`} className='rounded-[10px] w-full h-[120px] border-[1px] border-solid border-neutral-200 p-5 flex flex-row items-start gap-5 overflow-hidden hover:bg-neutral-200 trans cursor-pointer'>
                            <div className='relative w-[80px] h-[80px] rounded-md overflow-hidden'>
                                <Image alt='' src={company?.companyImage || noImage.src} fill className='w-full h-full absolute top-0 left-0' />
                            </div>

                            <div className='flex flex-col justify-between h-full'>
                                <h3 className='font-bold'>{company?.companyName}</h3>
                                <h5 className='text-neutral-500'>{company?.companyCity} , {company?.companyState} , {company?.companyCountry}</h5>
                                <div className='flex flex-row items-center gap-3'>
                                    <FaSuitcase size={20} />
                                    <h4>Jobs ({company?.jobs?.length || 0})</h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default Companies