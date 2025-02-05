'use server'

import { db } from "@/lib/db";

export const updateProfileViews = async (userId?: any, profileUserId?: any) => {
    if (!userId || !profileUserId || userId === profileUserId) {
        return;
    }

    try {
        const userProfile = await db.user.findUnique({
            where: { id: profileUserId },
            select: { ProfileViews: true },
        });

        if (!userProfile) {
            throw new Error("User profile not found");
        }

        if (userProfile.ProfileViews?.includes(userId)) {
            return { message: "User ID already exists in ProfileViews" };
        }

        await db.user.update({
            where: { id: profileUserId },
            data: {
                ProfileViews: {
                    push: userId,
                },
            },
        });

        return { success: "Profile view updated" };
    } catch (error) {
        console.error("Error updating profile views:", error);
        throw new Error("Failed to update profile views");
    }
};
