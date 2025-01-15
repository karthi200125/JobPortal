'use server';

import { db } from '@/lib/db';

export const updateImages = async (userId: number, userImage?: any, profileImage?: any) => {
    try {
        if (!userId || !userImage || !profileImage) {
            throw new Error('Invalid input parameters');
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                profileImage,
                userImage,
            },
        });

        return { success: 'User image updated successfully', data: updatedUser };
    } catch (error) {
        return { error: 'User image update failed' };
    }
};
