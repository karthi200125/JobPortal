'use server'

import { db } from "@/lib/db";

export const getCompanies = async () => {
    try {
        const companies: any = await db.company.findMany({
            where: {
                companyIsVerified: false
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

// export const getCompaniesEmployees = async (companyId?: any) => {
//     try {
//         const companies: any = await db.user.findMany({
//             where: {
//                 company: companyId
//             }
//         });

//         return companies
//     } catch (err) {
//         return { error: "Get companies failed" };
//     }
// };
