"use server";

import { db } from "@/lib/db";

export const AcceptOrRemove = async (
    userId: number,
    jobId: number,
    action: "accept" | "remove"
) => {
    try {
        if (!userId || !jobId || !action) {
            return { error: "Invalid input parameters." };
        }

        const jobApplication = await db.jobApplication.findFirst({
            where: {
                userId,
                jobId,
            },
            select: {
                id: true,
            },
        });

        if (!jobApplication) {
            return { error: "Job application not found." };
        }

        if (action === "accept") {
            await db.jobApplication.update({
                where: { id: jobApplication.id },
                data: { isSelected: true },
            });
            return { success: "Candidate has been selected." };
        } else if (action === "remove") {
            await db.jobApplication.update({
                where: { id: jobApplication.id },
                data: { isNotIntrested: true },
            });
            return { success: "Candidate has been removed." };
        } else {
            return { error: "Invalid action type." };
        }
    } catch (error) {
        console.error("Database error:", error);
        return { error: "Failed to update candidate status." };
    }
};
