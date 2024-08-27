'use server'

import { db } from "@/lib/db"

export const getCompanyById = async (cId?: number) => {
    const company = await db.company.findFirst({
        where: { id: cId }
    })

    return company
}