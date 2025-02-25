'use client'

import Button from '@/components/Button'
import Image from 'next/image'
import React, { useTransition } from 'react'
import { GoPlus } from 'react-icons/go'
import noImage from '../../../../public/noImage.webp'
import JobCompanySkeleton from '@/Skeletons/JobCompanySkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { userFollow } from '@/app/Redux/AuthSlice'
import { UserFollowAction } from '@/actions/user/UserFollowAction'
import Link from 'next/link'
import Batch from '@/components/Batch'

const JobCompany = ({ company, isPending }: any) => {

  const user = useSelector((state: any) => state.user?.user);
  const dispatch = useDispatch();
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const isFollowings = user?.followings?.includes(company?.userId);

  const handleFollow = async () => {
    if (!user?.id || !company?.userId) return;

    startTransition(() => {
      UserFollowAction(user.id, company?.userId).then((data: any) => {
        if (data?.success) {
          dispatch(userFollow(company?.userId));
          queryClient.invalidateQueries({ queryKey: ['getuser', company?.userId] });
        } else if (data?.error) {
          console.error(data.error);
        }
      });
    });
  };

  return (
    <>
      {isPending ?
        <JobCompanySkeleton />
        :
        <div className='w-full border rounded-[10px] min-h-[100px] p-5 space-y-5'>
          <h3 className='font-bold'>About The Company</h3>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-row items-center gap-5'>
              <div className="w-[40px] md:w-[100px] h-[40px] md:h-[100px] rounded-md overflow-hidden relative">
                <Image src={company?.companyImage || noImage.src} alt='' fill className='w-full h-full object-cover absolute top-0 left-0' />
              </div>
              <div className='space-y-1'>
                <Link href={`/userProfile/${company?.id}`} className='font-semibold capitalize flex flex-row items-center gap-3'>
                  {company?.companyName}
                  <Batch type='ORGANIZATION' />
                </Link>
                <h4 className='font-bold'>{company?.user?.followers?.length || 0} Follwers</h4>
                <h6>{company?.companyTotalEmployees} Employees</h6>
              </div>
            </div>
            <Button
              variant="border"
              isLoading={isLoading}
              className={isFollowings ? '!bg-[var(--voilet)] text-white' : ''}
              onClick={handleFollow}
              icon={!isFollowings && <GoPlus size={20} />}
            >
              {isFollowings ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
          <h5 className='text-[var(--lighttext)]'>{company?.companyAbout}</h5>
        </div>
      }
    </>
  )
}

export default JobCompany