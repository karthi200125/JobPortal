'use server'

import { db } from "@/lib/db"

export const getUserById = async (id?: number) => {
    const user = await db.user.findFirst({
        where: { id }
    })

    return user
}