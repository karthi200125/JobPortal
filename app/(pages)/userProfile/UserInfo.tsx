'use client';

import React, { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { VscLinkExternal } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import { getUserById } from '@/actions/auth/getUserById';
import { UserFollowAction } from '@/actions/user/UserFollowAction';
import { userFollow } from '@/app/Redux/AuthSlice';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Model from '@/components/Model/Model';
import { UserInfoForm } from '@/app/Forms/UserInfoForm';
import UserInfoSkeleton from '@/Skeletons/UserInfoSkeleton';
import UserBackImage from '@/app/Forms/UserBackImage';
import UserProfileImage from './UserProfileImage';
import noProfile from '../../../public/noProfile.webp';

interface ProfileUserProps {
    profileUser?: any;
    isLoading?: boolean;
    isOrg?: boolean;
    company?: any;
}

const UserInfo = ({ profileUser, isLoading = false, isOrg = false, company }: ProfileUserProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const isFollowings = user?.followings?.includes(profileUser?.id);
    const isCurrentUser = user?.id === profileUser?.id;

    const handleFollow = async () => {
        if (!user?.id || !profileUser?.id) return;

        startTransition(() => {
            UserFollowAction(user.id, profileUser.id).then((data: any) => {
                if (data?.success) {
                    dispatch(userFollow(profileUser.id));
                    queryClient.invalidateQueries({ queryKey: ['getuser', profileUser?.id] });
                } else if (data?.error) {
                    console.error(data.error);
                }
            });
        });
    };

    const renderProfileDetails = () => {
        const displayName = isOrg ? company?.companyName : profileUser?.username;
        const displayBio = isOrg ? company?.companyName : profileUser?.userBio;
        const displayLocation = isOrg
            ? `${company?.companyCity}, ${company?.companyState}, ${company?.companyCountry}`
            : `${profileUser?.city}, ${profileUser?.state}, ${profileUser?.country}`;
        const website = isOrg ? company?.companyWebsite : profileUser?.website;

        return (
            <>
                <h2 className="font-bold capitalize">{displayName}</h2>
                <h3 className="w-[70%] text-lg text-[var(--lighttext)]">{displayBio}</h3>
                <h4 className="capitalize">{displayLocation}</h4>
                <div className="flex flex-row items-center gap-2 text-[var(--voilet)] hover:underline transition">
                    <a href={website || ''} className="font-bold" target="_blank" rel="noopener noreferrer">
                        Personal Website
                    </a>
                    <VscLinkExternal size={15} />
                </div>
            </>
        );
    };

    const renderFollowButtons = () => (
        <div className="flex flex-row items-center gap-5 mt-5">
            <Button
                variant="border"
                isLoading={isPending}
                className={isFollowings ? '!bg-[var(--voilet)] text-white' : ''}
                onClick={handleFollow}
                icon={!isFollowings && <GoPlus size={20} />}
            >
                {isFollowings ? 'Unfollow' : 'Follow'}
            </Button>
            <Button variant="border" icon={<IoMdSend size={20} />}>
                Message
            </Button>
        </div>
    );

    const renderCurrentUserActions = () => (
        <Model
            bodyContent={<UserInfoForm />}
            title="Edit Profile"
            className="min-w-[300px] lg:w-[800px]"
            triggerCls="absolute top-3 right-3"
        >
            <Icon icon={<LuPencil size={20} />} isHover title="Edit Profile" />
        </Model>
    );

    return (
        <div className="relative w-full min-h-[200px] overflow-hidden rounded-[20px] border">
            {/* Image Container */}
            <div className="absolute top-0 left-0 w-full h-[100px] md:h-[200px]">
                <Image
                    src={profileUser?.profileImage || 'https://img.freepik.com/free-photo/abstract-smooth-empty-grey-studio-well-use-as-backgroundbusiness-reportdigitalwebsite-templatebackdrop_1258-90252.jpg?semt=ais_hybrid'}
                    alt="Profile Background"
                    width={100}
                    height={200}
                    className="bg-neutral-200 w-full h-full object-cover"
                />
                {/* <Model
                    bodyContent={<UserProfileImage />}
                    title="Edit Images"
                    className="w-full md:w-[800px]"
                    triggerCls="absolute bottom-[-40px] left-5"
                >
                    <Image
                        src={isCurrentUser ? user?.userImage : profileUser?.userImage || noProfile.src}
                        alt="Profile"
                        width={150}
                        height={150}
                        className="w-[150px] h-[150px] rounded-full border-[4px] border-solid border-[var(--white)] object-cover"
                    />
                </Model> */}
                {isCurrentUser && (
                    <Model
                        bodyContent={<UserBackImage />}
                        title="Edit Images"
                        className="w-full md:w-[800px]"
                        triggerCls="absolute top-3 right-3"
                    >
                        <Icon icon={<LuPencil size={20} />} isHover title="Edit Profile" />
                    </Model>
                )}
            </div>

            {isLoading ? (
                <UserInfoSkeleton />
            ) : (
                <div className="relative mt-[250px] w-full p-5 space-y-2">
                    {renderProfileDetails()}
                    <div className="flex flex-row items-center gap-5">
                        <h4 className="bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5">
                            <b className="font-bold">{profileUser?.followers?.length || 0}</b> Followers
                        </h4>
                        <h4 className="bg-neutral-100 rounded-md max-w-max p-3 flex flex-row items-center gap-5">
                            <b className="font-bold">{profileUser?.followings?.length || 0}</b> Followings
                        </h4>
                    </div>
                    {!isCurrentUser && renderFollowButtons()}
                    {isCurrentUser && renderCurrentUserActions()}
                </div>
            )}
        </div>
    );
};

export default UserInfo;
