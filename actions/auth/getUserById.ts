'use server'

import { db } from "@/lib/db"

export const getUserById = async (id: any) => {

    if (!id) {
        console.warn("User ID is required but not provided");
        return null;
    }

    const user: any = await db.user.findUnique({
        where: { id },
        include: {
            jobApplications: true,
            postedJobs: true,
            company: {
                include: {
                    jobs: true
                }
            },
            educations: true,
            experiences: true,
            projects: true,
        },
    })

    return user
}
