'use server';

import { db } from '@/lib/db';

export const deleteJob = async (jobId: number) => {
    try {
        await db.job.delete({
            where: {
                id: jobId,
            }
        });

        return { success: 'Job Deleted successfully' };
    } catch (error) {
        return { error: 'Job Delete failed' };
    }
};
