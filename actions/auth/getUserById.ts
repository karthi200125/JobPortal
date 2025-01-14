'use server'

import { db } from "@/lib/db"

export const getUserById = async (id: number) => {
    if (!id) {
        throw new Error("User ID is required")
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
