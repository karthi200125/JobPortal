'use server'

import { db } from "@/lib/db"

export const GetLpJobs = async () => {
    try {
        const allJobs: any = await db.job.findMany({
            include: {
                company: true
            },            
        });
        return allJobs;
    } catch (err) {
        return { error: "Get all jobs failed" };
    }
};
