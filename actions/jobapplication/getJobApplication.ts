'use server'

import { db } from "@/lib/db";

export const getAppliedJobs = async (userId?: any, jobId: any) => {
    try {
        const jobApplication = await db.jobApplication.findUnique({
            where: {
                userId,
                jobId
            }            
        });
                
        return { success: true, data: jobApplication };
    } catch (error) {
        console.error(error);
        return { error: "Failed to retrieve jobApplication" };
    }
};
