'use server'

import { db } from "@/lib/db"

export const getCompanyById = async (cId?: number) => {
    const company = await db.company.findFirst({
        where: { id: cId },
        include: {
            user: {
                select: {
                    followers: true
                }
            }
        }
    });

    return company
}

export const getCompanyByUserId = async (userId?: any) => {
    const company = await db.company.findFirst({
        where: { userId: userId }
    })

    return company
}