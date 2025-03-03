'use server';

import { db } from "@/lib/db";
import { Job } from "@prisma/client";
import { getUserById } from "../auth/getUserById";

export const getSavedJobs = async (userId: number): Promise<Job[] | { error: string }> => {
    try {

        const user = await getUserById(userId)

        const allJobs = await db.job.findMany({
            where: {
                id: {
                    in: user?.savedJobs,
                },
            },
        });

        return allJobs;
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        return { error: "Failed to retrieve saved jobs" };
    }
};
