'use server';

import { db } from '@/lib/db';
import { CompanySchema } from '@/lib/SchemaTypes';
import * as z from 'zod';

export const createCompanyAction = async (
    values: z.infer<typeof CompanySchema>,
    userId?: any,
) => {
    try {
        const validatedFields = CompanySchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid fields', details: validatedFields.error.errors };
        }

        const companyData = validatedFields.data;

        const newCompany = await db.company.create({
            data: {
                ...companyData,
                userId,
            },
        });

        return { success: `${newCompany?.companyName} created successfully`, data: newCompany };
    } catch (error) {
        return { error: 'Company creation failed' };
    }
};
