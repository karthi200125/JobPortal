'use server'

import { db } from "@/lib/db"

export const getNetworkusers = async (usersIds: any) => {

    try {
        const users: any = await db.user.findMany({
            where: {
                id: {
                    in: usersIds
                }
            }
        })
        return users
    } catch (err) {
        console.log(err)
    }
}