"use server";

import { db } from "@/lib/db";

export const AcceptOrRemove = async (
    JobApplicationId: number,
    action: "accept" | "remove"
) => {
    try {
        if (!JobApplicationId || !action) {
            return { error: "Invalid input parameters." };
        }

        if (action === "accept") {
            await db.jobApplication.update({
                where: { id: JobApplicationId },
                data: { isSelected: true },
            });
            return { success: "Candidate has been selected." };
        } else if (action === "remove") {
            await db.jobApplication.update({
                where: { id: JobApplicationId },
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
