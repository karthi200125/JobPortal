'use server'

import { db } from "@/lib/db";

export const getCompanies = async () => {
    try {
        const companies: any = await db.company.findMany({
            where: {
                companyIsVerified: false
            }
        });

        return companies
    } catch (err) {
        return { error: "Get companies failed" };
    }
};
