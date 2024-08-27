'use server';

import { getUserById } from "@/actions/auth/getUserById";
import { db } from "@/lib/db";

export const UserFollowAction = async (currentUserId: any, userId: any) => {
    try {
        const currentUser = await getUserById(currentUserId);
        const user = await getUserById(userId);

        if (!currentUser || !user) {
            return { error: "User not found" };
        }

        const isFollowing = currentUser.followings.includes(userId);

        if (isFollowing) {
            // Unfollow user
            await db.user.update({
                where: { id: currentUserId },
                data: {
                    followings: {
                        set: currentUser.followings.filter(id => id !== userId),
                    },
                },
            });
            await db.user.update({
                where: { id: userId },
                data: {
                    followers: {
                        set: user.followers.filter(id => id !== currentUserId),
                    },
                },
            });
            return { success: "User has been unfollowed" };
        } else {
            // Follow user
            await db.user.update({
                where: { id: currentUserId },
                data: {
                    followings: {
                        set: [...currentUser.followings, userId],
                    },
                },
            });
            await db.user.update({
                where: { id: userId },
                data: {
                    followers: {
                        set: [...user.followers, currentUserId],
                    },
                },
            });
            return { success: "User has been followed" };
        }

    } catch (error) {
        console.error("Error in UserFollowAction:", error);
        return { error: "An error occurred while updating follow status" };
    }
};
