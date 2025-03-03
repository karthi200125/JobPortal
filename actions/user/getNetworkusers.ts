'use server'

import { db } from "@/lib/db"
import { getUserById } from "../auth/getUserById";

export const getNetworkusers = async (userId: number, type?: string) => {

    try {

        const currentUser = await getUserById(userId)

        let users: any
        if (type === "followers") {
            users = await db.user.findMany({
                where: {
                    id: {
                        in: currentUser?.followers
                    }
                }
            })
        } else {
            users = await db.user.findMany({
                where: {
                    id: {
                        in: currentUser?.followings
                    }
                }
            })
        }
        return users
    } catch (err) {
        console.log(err)
    }
}