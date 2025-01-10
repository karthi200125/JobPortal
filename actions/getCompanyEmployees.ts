'use server';

import { db } from "@/lib/db";

export const getCompaniesEmployees = async () => {
    try {
        const employees: any = await db.user.findMany();
        return employees;
    } catch (error) {
        return { error: "Failed to fetch employees" };
    }
};
