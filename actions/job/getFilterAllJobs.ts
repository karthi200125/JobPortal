'use server'

import { db } from "@/lib/db";

export const getFilterAllJobs = async () => {
    try {
        const allJobs: any = await db.job.findMany({
            include: {
                jobApplications: true,
            }
        });

        return allJobs
    } catch (err) {
        return { error: "Get All Jobs failed" };
    }
};
