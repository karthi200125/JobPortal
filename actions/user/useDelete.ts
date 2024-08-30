'use server'

import { db } from "@/lib/db"

export const UserDelete = async (userId?: any) => {
    try {
        // delete user
        await db.user.delete({
            where: {
                userId
            }
        })
        // remove rse id from follower and followwr in all users if hwree my id is there
        await db.user.delete({
            where: {
                followers: {
                    in: userId
                },
                followings: {
                    in: userId
                },
                profileViews: {
                    in: userId
                },
                savedJobs: {
                    in: userId
                }
            }
        })
        return { success: "User Deleted Successfully" }
    } catch (error) {
        return { error: "User Delete failed" }
    }
}