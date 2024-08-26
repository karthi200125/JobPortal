'use server'

import { db } from "@/lib/db";

export const getCompanies = async () => {
    try {
        const companies = await db.company.findMany({
            where: {
                companyIsVerified: false
            }
        });

        return companies?.length > 0 ? companies?.map((company) => company?.companyName) : []
    } catch (err) {
        return { error: "Get companies failed" };
    }
};
