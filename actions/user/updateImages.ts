'use server';

import { db } from '@/lib/db';

export const updateImages = async (
    userId: number,
    userImage?: string | null,
    profileImage?: string | null
) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        if (!profileImage && !userImage) {
            throw new Error('At least one image field must be provided');
        }

        const data: Record<string, string> = {};
        if (profileImage) data.profileImage = profileImage;
        if (userImage) data.userImage = userImage;

        const updatedUser: any = await db.user.update({
            where: { id: userId },
            data,
        });
        
        return { success: 'User images updated successfully', data: updatedUser };
    } catch (error: any) {
        console.error('Error updating user images:', error);
        return { error: 'User image update failed', details: error.message };
    }
};
