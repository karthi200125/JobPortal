'use client';

import { moreProUsers } from '@/actions/moreProfileUsers';
import { UserFollowAction } from '@/actions/user/UserFollowAction';
import { userFollow } from '@/app/Redux/AuthSlice';
import Batch from '@/components/Batch';
import Button from '@/components/Button';
import MessageButton from '@/components/MessageButton';
import { useCustomToast } from '@/lib/CustomToast';
import MoreProfileSkeleton from '@/Skeletons/MoreProfileSkeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState, useTransition } from 'react';
import { GoPlus } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../../public/noProfile.webp';
import Model from '@/components/Model/Model';
import MessageBox from '../messages/MessageBox';
import { IoMdSend } from 'react-icons/io';
import { openModal } from '@/app/Redux/ModalSlice';

interface User {
    id: number;
    userImage?: string;
    username?: string;
    isPro?: boolean;
    role?: string;
    profession?: string;
}

interface ProfileUserProps {
    userId?: number;
}

const MoreProfiles = ({ userId }: ProfileUserProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { data = [], isLoading } = useQuery({
        queryKey: ['getMoreProfiles', user?.id, userId],
        queryFn: async () => moreProUsers(user, userId),
    });

    return (
        <div className="w-full min-h-[200px] overflow-hidden rounded-[20px] border space-y-3 p-5">
            <Model
                bodyContent={<MessageBox receiverId={selectedUser?.id} chatUser={selectedUser} />}
                title={`Message ${selectedUser?.username || 'User'}`}
                className="min-w-[300px] lg:w-[800px]"
                modalId="messageModel"
            >
                <div></div>
            </Model>
            <h3 className="font-bold">
                {user?.id === userId ? 'More Profiles' : 'Profile Followers'}
            </h3>
            {isLoading ? (
                <MoreProfileSkeleton />
            ) : data.length > 0 ? (
                data.map((moreUser: User) => (
                    <MoreUserProfile key={moreUser.id} moreuser={moreUser} onSelectedUser={setSelectedUser} />
                ))
            ) : (
                <h4 className="text-[var(--lighttext)]">No Profiles</h4>
            )}
        </div>
    );
};

export default memo(MoreProfiles);

interface MoreUserProfileProps {
    moreuser: User;
    onSelectedUser?: (user: User) => void;
}

export const MoreUserProfile = ({ moreuser, onSelectedUser }: MoreUserProfileProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const [isPending, startTransition] = useTransition();
    const isCurrentUser = user?.id === moreuser?.id;

    const isFollowing = user?.followings?.includes(moreuser?.id);

    const handleFollow = () => {
        startTransition(() => {
            UserFollowAction(user?.id, moreuser?.id).then((data: any) => {
                if (data?.success) {
                    showSuccessToast(data.success);
                    dispatch(userFollow(moreuser?.id));
                    queryClient.invalidateQueries({ queryKey: ['getuser', user?.id] });
                } else if (data?.error) {
                    showErrorToast(data.error);
                }
            });
        });
    };

    const handleOpenModal = useCallback(() => {
        onSelectedUser && onSelectedUser(moreuser);
        dispatch(openModal('messageModel'));
    }, [dispatch, moreuser, onSelectedUser]);

    return (
        <div className="flex flex-row items-start gap-5 border-b py-5">
            <div className="relative w-[40px] h-[40px] overflow-hidden rounded-full">
                <Image
                    src={moreuser?.userImage || noAvatar.src}
                    alt={moreuser?.username || 'No Avatar'}
                    fill
                    className="rounded-full object-cover absolute top-0 left-0 w-full h-full"
                />
            </div>
            <div className="space-y-2">
                <div className="flex flex-row items-center gap-3">
                    <Link href={`/userProfile/${moreuser?.id}`} className="font-bold cursor-pointer trans capitalize">
                        {moreuser?.username}
                    </Link>
                    {moreuser?.role === 'ORGANIZATION' ? <Batch type="ORGANIZATION" /> : moreuser?.isPro && <Batch type="premium" />}
                </div>
                <h5>{moreuser?.profession}</h5>
                {!isCurrentUser && (
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="border"
                            isLoading={isPending}
                            className={`${isFollowing ? '!bg-[var(--voilet)] text-white' : ''} !h-[30px]`}
                            onClick={handleFollow}
                            icon={!isFollowing && <GoPlus size={20} />}
                        >
                            {!isFollowing ? 'Follow' : 'Unfollow'}
                        </Button>
                        <Button
                            onClick={handleOpenModal}
                            disabled={user?.isPro}
                            variant="border"
                            icon={<IoMdSend size={20} />}
                            className="!h-[30px]"
                        >
                            Message
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
