'use server';

import { db } from '@/lib/db';
import { CompanySchema } from '@/lib/SchemaTypes';
import * as z from 'zod';
import { getUserById } from '../auth/getUserById';

export const createCompanyAction = async (
    values: z.infer<typeof CompanySchema>,
    userId?: any,
) => {
    try {

        const user = await getUserById(userId)

        if (user?.role !== 'ORGANIZATION') {
            return { error: 'you are nto allowed to create company' }
        }

        const validatedFields = CompanySchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid fields' };
        }

        const data = validatedFields.data;

        const companyExists = await db.company.findFirst({
            where: {
                companyName: data?.companyName
            }
        });

        if (companyExists) {
            return { error: `${data?.companyName} is already created` };
        }

        const newCompany = await db.company.create({
            data: {
                ...data,
                userId: user?.id
            },
        });

        return { success: `${newCompany?.companyName} created successfully`, data: newCompany };
    } catch (error) {
        return { error: 'Company creation failed' };
    }
};
