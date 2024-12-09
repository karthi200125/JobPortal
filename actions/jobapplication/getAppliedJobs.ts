'use server'

import { db } from "@/lib/db";

export const getAppliedJobs = async (userId?: any) => {
    try {
        const jobApplications = await db.jobApplication.findMany({
            where: {
                userId: userId,
            },
            select: {
                jobId: true,
            },
        });

        const jobIds = jobApplications.map((application) => application.jobId);

        const appliedJobs = await db.job.findMany({
            where: {
                id: {
                    in: jobIds,
                },
                userId: {
                    not: userId,
                },
            },
            include: {
                company: true,
            }
        });

        return { success: true, data: appliedJobs };
    } catch (error) {
        console.error(error);
        return { error: "Failed to retrieve candidate's applied jobs." };
    }
};
