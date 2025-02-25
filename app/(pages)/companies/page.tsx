'use client'

import { getCompanies } from '@/actions/company/getCompanies'
import ComapniesSkeleton from '@/Skeletons/ComapniesSkeleton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { FaSuitcase } from 'react-icons/fa'
import noImage from '../../../public/noImage.webp'
import Title from '@/lib/MetaTitle'
import Batch from '@/components/Batch'

const Companies = () => {

    const { data, isPending } = useQuery({
        queryKey: ['getCompanies'],
        queryFn: async () => await getCompanies(),
    });

    return (
        <div className='w-full min-h-screen py-5 space-y-5 px-2'>
            <Title
                title="Top Hiring Companies | JOBIFY"
                description="Discover companies that are hiring. Learn about company cultures, job openings, and career opportunities."
                keywords="companies, hiring companies, job openings, work culture, recruiters"
            />

            <h2 className='font-bold'>All Companies</h2>
            {isPending ?
                <ComapniesSkeleton />
                :
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5'>
                    {data?.map((company: any) => (
                        <div key={company?.id} className='rounded-[10px] w-full max-h-max md:h-[120px] border-[1px] border-solid border-neutral-200 p-5 flex flex-row items-start gap-5 overflow-hidden hover:shadow-lg trans cursor-pointer'>
                            <div className='relative w-[40px] md:w-[80px] h-[40px] md:h-[80px] rounded-md overflow-hidden'>
                                <Image alt='' src={company?.companyImage || noImage.src} fill className='w-full h-full absolute top-0 left-0' />
                            </div>

                            <div className='flex flex-col justify-between h-full space-y-1'>
                                <Link href={`/userProfile/${company?.id}`} className='font-bold hover:opacity-50 trans flex flex-row items-center gap-2'>{company?.companyName} <Batch type='ORGANIZATION' /></Link>
                                <h5 className='text-neutral-500 line-clamp-1'>{company?.companyCity} , {company?.companyState} , {company?.companyCountry}</h5>
                                <Link href={`/jobs?company=${company?.companyName}`} className='flex flex-row items-center gap-3 hover:opacity-50 trans' >
                                    <FaSuitcase size={20} />
                                    <h4>Jobs ({company?.jobs?.length || 0})</h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Companies