'use server';

import { db } from "@/lib/db";
import { Job } from "@prisma/client";

export const getActionTakenJobs = async (userId: number): Promise<Job[]> => {
    try {
        if (!userId) {
            throw new Error("Invalid user ID");
        }

        const jobs = await db.job.findMany({
            where: {
                jobApplications: {
                    some: {
                        userId,
                        isSelected: true,
                    },
                },
            },
        });

        return jobs;
    } catch (error) {
        console.error("Error fetching action taken jobs:", error);
        throw new Error("Failed to retrieve action taken jobs.");
    }
};
