'use server'

import { db } from "@/lib/db";

export const getCompanies = async () => {
    try {
        const companies: any = await db.company.findMany({
            where: {
                companyIsVerified: true
            },
            include: {
                jobs: true
            }
        });

        return companies
    } catch (err) {
        return { error: "Get companies failed" };
    }
};

export const getRecruiterCompany = async (userId?: number) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const user = await db.user.findFirst({
            where: {
                employees: {
                    has: userId,
                },
            },
            select: {
                username: true,
            },
        });

        if (!user) {
            return { error: "Company not found" };
        }

        return { companyName: user.username };
    } catch (err) {
        return { error: "Get company failed" };
    }
};
