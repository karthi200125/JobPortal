'use server';

import { CreateJobSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';
import { getUserById } from '../auth/getUserById';

export const createJobAction = async (values: z.infer<typeof CreateJobSchema>, userId?: any, companyId?: any) => {
    try {
        const user = await getUserById(userId);

        if (user?.role !== "ORGANIZATION" && user?.role !== "RECRUITER") {
            return { error: "You are not a recruiter or organization" };
        }

        const validatedFields = CreateJobSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields", issues: validatedFields.error.format() };
        }

        const data = validatedFields.data;


        const newJob = await db.job.create({
            data: {
                ...data,
                userId: user?.id,
                companyId
            }
        });

        return { success: 'New job has been created successfully', data: newJob };
    } catch (error) {
        return { error: 'Job creation failed' };
    }
};
