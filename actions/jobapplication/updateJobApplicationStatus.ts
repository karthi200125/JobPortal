'use server'

import { db } from "@/lib/db";

export const updateJobApplicationStatus = async (JobAppId?: any) => {
    try {

        await db.jobApplication.update({
            where: {
                id: JobAppId,
            },
            data: {
                isApplicationViewed: true,
                ApplicationViewedUpdatedAt: new Date()
            }
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update Jobapplication status" };
    }
};
