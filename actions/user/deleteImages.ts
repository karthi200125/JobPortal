'use server';

import { db } from '@/lib/db';

export const deleteImages = async (userId: any, image?: 'pro' | 'user') => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        let updatedUser;

        if (image === 'pro') {
            updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    profileImage: null
                },
            });
        }
        if (image === 'user') {
            updatedUser = await db.user.update({
                where: { id: userId },
                data: {
                    userImage: null
                },
            });
        }

        return { success: 'Image deleted successfully', data: updatedUser };
    } catch (error: any) {
        console.log(error)
        return { error: `Image delete failed: ${error.message}` };
    }
};
