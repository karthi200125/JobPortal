'use server';

import { db } from "@/lib/db";

export const getApplicationCandidates = async (jobId?: any) => {
    try {

        const jobApplicationCandidates: any = await db.jobApplication.findMany({
            where: {
                jobId
            },
            include: {
                user: true,
                job: true,
            },
        });

        return jobApplicationCandidates;
    } catch (error) {
        console.error("Error fetching job application candidates:", error);
        return { error: "Failed to retrieve applied job candidates." };
    }
};
