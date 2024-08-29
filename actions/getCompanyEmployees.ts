'use server'

import { db } from "@/lib/db"

export const getCompaniesEmployees = async () => {
    const employees = await db.user.findMany()
    return employees
}