"use server";

import { db } from "@/lib/db";

export const getAllJobs = async () => {
    try {
        const jobs: any = await db.job.findMany();
        return jobs;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
};
