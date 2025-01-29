'use server'

import { db } from "@/lib/db"

export const GetLpJobs = async () => {
    try {
        const allJobs: any = await db.user.findMany();
        console.log("Fetched Jobs:", allJobs);
        return allJobs;
    } catch (err) {
        console.error("Error fetching jobs:", err);
        return { error: "Get all jobs failed" };
    }
};
