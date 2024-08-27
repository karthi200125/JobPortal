'use server'

import { getUserById } from "@/actions/auth/getUserById";
import { db } from "@/lib/db";


export const SavedJobAction = async (jobId: any, userId: any) => {
    try {
        const user: any = await getUserById(userId);
        const isSaved = user.savedJobs.includes(jobId);

        if (isSaved) {
            await db.user.update({
                where: { id: userId },
                data: {
                    savedJobs: {
                        set: user.savedJobs.filter((id: any) => id !== jobId),
                    },
                },
            });
            return { success: "Job has been unsaved" };
        } else {
            await db.user.update({
                where: { id: userId },
                data: {
                    savedJobs: {
                        set: [...user.savedJobs, jobId],
                    },
                },
            });
            return { success: "Job has been saved" };
        }

    } catch (error) {
        return { error: "error" }
    }
}