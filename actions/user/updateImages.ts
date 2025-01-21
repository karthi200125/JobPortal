'use server';

import { db } from '@/lib/db';

export const updateImages = async (userId: number, userImage?: any, profileImage?: any) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const dataToUpdate: Record<string, any> = {};

        if (userImage) {
            dataToUpdate.userImage = userImage;
        }

        if (profileImage) {
            dataToUpdate.profileImage = profileImage;
        }

        // If both images are not provided, throw an error
        if (Object.keys(dataToUpdate).length === 0) {
            throw new Error('At least one image (userImage or profileImage) must be provided');
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });

        return { success: 'User images updated successfully', data: updatedUser };
    } catch (error: any) {
        return { error: 'User image update failed' };
    }
};
