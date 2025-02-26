'use client';

import { moreProUsers } from '@/actions/moreProfileUsers';
import Batch from '@/components/Batch';
import Button from '@/components/Button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { memo, useTransition } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../../public/noProfile.webp';
import MoreProfileSkeleton from '@/Skeletons/MoreProfileSkeleton';
import Link from 'next/link';
import { UserFollowAction } from '@/actions/user/UserFollowAction';
import { userFollow } from '@/app/Redux/AuthSlice';
import { useCustomToast } from '@/lib/CustomToast';
import MessageButton from '@/components/MessageButton';

interface ProfileUserProps {
    userId?: string | number;
}

const MoreProfiles = ({ userId }: ProfileUserProps) => {
    const user = useSelector((state: any) => state.user.user);

    const { data = [], isLoading } = useQuery({
        queryKey: ['getMoreProfiles', user, userId],
        queryFn: async () => moreProUsers(user, userId),
    });

    return (
        <div className="w-full min-h-[200px] overflow-hidden rounded-[20px] border space-y-3 p-5">
            <h3 className="font-bold">
                {user?.id === userId ? 'More Profiles' : 'Profile Followers'}
            </h3>
            {isLoading ? (
                <MoreProfileSkeleton />
            ) : data?.length > 0 ? (
                data.map((moreuser: any) => (
                    <MoreUserProfile key={moreuser?.id} moreuser={moreuser} />
                ))
            ) : (
                <h4 className="text-[var(--lighttext)]">No Profiles</h4>
            )}
        </div>
    );
};

export default memo(MoreProfiles);

interface MoreUserProfileProps {
    moreuser: {
        id: any;
        userImage?: string;
        username?: string;
        isPro?: boolean;
        role?: any;
        profession?: string;
    };
}

export const MoreUserProfile = ({ moreuser }: MoreUserProfileProps) => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { showSuccessToast, showErrorToast } = useCustomToast()

    const isFollowings = user?.followings?.includes(moreuser?.id);
    const [isPending, startTransition] = useTransition();

    const isCurrentUser = user?.id === moreuser?.id

    const handleFollow = () => {
        startTransition(() => {
            const currentUserId = user?.id;
            const userId = moreuser?.id;
            UserFollowAction(currentUserId, userId).then((data: any) => {
                if (data?.success) {
                    showSuccessToast(data?.success)
                    dispatch(userFollow(userId));
                    queryClient.invalidateQueries({ queryKey: ['getuser', user?.id] })
                } else if (data?.error) {
                    showErrorToast(data.error);
                }
            });
        });
    };

    return (
        <div className="flex flex-row items-start gap-5 border-b py-5">
            <div className='relative w-[40px] h-[40px] overflow-hidden rounded-full'>
                <Image
                    src={moreuser?.userImage || noAvatar.src}
                    alt={moreuser?.username || 'No Avatar'}
                    fill
                    className="rounded-full object-cover absolute top-0 left-0 w-full h-full"
                />
            </div>
            <div className="space-y-2">
                <div className="flex flex-row items-center gap-3">
                    <Link
                        href={`/userProfile/${moreuser?.id}`}
                        className="font-bold cursor-pointer trans capitalize"
                    >
                        {moreuser?.username}
                    </Link>
                    {moreuser?.role === 'ORGANIZATION' ?
                        <Batch type="ORGANIZATION" />
                        :
                        (moreuser?.isPro && <Batch type="premium" /> || '')
                    }
                </div>
                <h5>{moreuser?.profession}</h5>
                {!isCurrentUser &&
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="border"
                            isLoading={isPending}
                            className={`${isFollowings && '!bg-[var(--voilet)] text-white'
                                } !h-[30px]`}
                            onClick={handleFollow}
                            icon={!isFollowings && <GoPlus size={20} />}
                        >
                            {!isFollowings ? 'Follow' : 'Unfollow'}
                        </Button>
                        <Button
                            variant="border"
                            icon={<IoMdSend size={15} />}
                            className="!h-[30px]"
                            disabled={!user?.isPro}
                        >
                            Message
                        </Button>
                        {/* <MessageButton receiver={moreuser} className='!h-[30px]'/> */}
                    </div>
                }
            </div>
        </div>
    );
};
