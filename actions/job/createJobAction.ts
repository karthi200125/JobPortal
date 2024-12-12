'use server';

import { CreateJobSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';
import { getUserById } from '../auth/getUserById';
import { getCompanies } from '../company/getCompanies';

export const createJobAction = async (
    values: z.infer<typeof CreateJobSchema>,
    userId?: any,
    skills?: any,
    questions?: any
) => {
    try {
        if (!userId) {
            return { error: "User ID is required" };
        }

        const user = await getUserById(userId);

        if (!user || (user.role !== "ORGANIZATION" && user.role !== "RECRUITER")) {
            return { error: "You are not allowed to create a job" };
        }

        const validatedFields = CreateJobSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields", issues: validatedFields.error.format() };
        }

        const { company, ...jobData } = validatedFields.data;

        const companies = await getCompanies();
        const uniqueCompany = companies?.find((c: any) => c.companyName === company);

        if (!uniqueCompany) {
            return { error: "Company not found" };
        }

        const newJob = await db.job.create({
            data: {
                ...jobData,
                userId: user.id,
                companyId: uniqueCompany.id,
                skills , 
                questions,
                jobDesc: "Default job description"
            },
        });

        return { success: 'New job has been created successfully', data: newJob };
    } catch (error) {
        return { error: 'Job creation failed' };
    }
};
