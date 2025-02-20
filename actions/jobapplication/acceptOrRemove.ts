'use server'

import { db } from "@/lib/db";

export const Accept_or_Remove = async (userId?: any, jobId?: any, action?: string) => {

    try {
        if (action === 'accept') {

        } else {

        }
        
        return { success: "", data: [] }
    } catch (error) {
        console.error(error);
        return { error: "Failed to retrieve candidate's applied jobs." };
    }
};
