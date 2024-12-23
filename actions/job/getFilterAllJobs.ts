'use server'

import { db } from "@/lib/db";

export const getFilterAllJobs = async (userId: any) => {


    try {
        const allJobs:any = await db.job.findMany({
            where: {
                NOT: {
                    jobApplications: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            },
            include: {
                jobApplications: true,
            },
        });

        return allJobs;
    } catch (err) {
        return { error: "Get All Jobs failed" };
    }
};
