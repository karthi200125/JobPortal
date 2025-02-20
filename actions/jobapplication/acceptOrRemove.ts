'use server'

import { db } from "@/lib/db";

export const Accept_or_Remove = async (userid?: any, jobId?: any, action?: string) => {

    try {

        if (action === 'accept') {
            await db.jobApplication.update({
                where: {
                    jobId,
                    userId
                },
                data: {
                    isSelected: true
                }
            })
            return { success: "Candiadte ahs been selected" }
        } else {
            await db.jobApplication.update({
                where: {
                    jobId,
                    userId
                },
                data: {
                    isNotIntrested: true
                }
            })
            return { success: "Candadte has removed" }
        }

    } catch (error) {
        console.error(error);
        return { error: "Failed to retrieve candidate's applied jobs." };
    }
};
