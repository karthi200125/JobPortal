'use server';

import { CreateJobSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';

export const createJobAction = async (values: z.infer<typeof CreateJobSchema>) => {
    try {
        const validatedFields = CreateJobSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        const { company, jobTitle, jobDesc, experience, salary, city, state, country, type, isEasyApply, applyLink, mode } = validatedFields.data;

        const newJob = await db.job.create({
            data: {
                company,
                jobTitle,
                jobDesc,
                experience,
                salary,
                city,
                state,
                country,
                type,
                isEasyApply,
                applyLink,
                mode
            }
        });

        return { success: 'New job has been created successfully', data: newJob };
    } catch (error) {
        return { error: 'Job creation failed', details: error instanceof Error ? error.message : error };
    }
};
