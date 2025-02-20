'use server';

import { db } from "@/lib/db";

export const getJobUsingId = async (jobId: any) => {
    try {
        const job: any = await db.job.findUnique({
            where: { id: jobId },
            include: {
                jobApplications: true
            }
        });

        return job;
    } catch (error) {
        console.error("Error fetching job:", error);
        return { error: "Failed to retrieve job" };
    }
};
