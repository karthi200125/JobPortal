'use server'

import { db } from "@/lib/db"

export const getUserById = async (id: number) => {
    if (!id) {
        throw new Error("User ID is required")
    }

    const user = await db.user.findUnique({
        where: { id }
    })

    return user
}
