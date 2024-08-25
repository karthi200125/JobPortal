'use server';

import { db } from '@/lib/db';
import { CreateCompanySchema } from '@/lib/SchemaTypes';
import * as z from 'zod';

export const createCompanyAction = async (
    
) => {
    try {
        const validatedFields = CreateCompanySchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: 'Invalid fields' };
        }

        const data = validatedFields.data;


        return { success: "" }
    } catch (error) {
        return { error: 'User project processing failed' };
    }
};
