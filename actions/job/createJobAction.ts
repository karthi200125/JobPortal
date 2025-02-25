'use server';

import { CreateJobSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';
import { getUserById } from '../auth/getUserById';
import { getCompanies } from '../company/getCompanies';

interface CreateJobProps {
    values: z.infer<typeof CreateJobSchema>;
    userId: string;
    skills?: string[];
    questions?: string[];
    jobDesc?: string;
    isEdit?: boolean;
    jobId?: number;
}

export const createJobAction = async ({
    values,
    userId,
    skills = [],
    questions = [],
    jobDesc = '',
    isEdit = false,
    jobId,
}: CreateJobProps) => {
    try {
        if (!userId) {
            return { error: "User ID is required" };
        }

        const user = await getUserById(userId);

        if (!user || (user.role !== "ORGANIZATION" && user.role !== "RECRUITER")) {
            return { error: "You are not authorized to create a job" };
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

        let job;
        if (isEdit && jobId) {
            job = await db.job.update({
                where: { id: jobId },
                data: {
                    ...jobData,
                    skills,
                    questions,
                    jobDesc,
                },
            });
        } else {
            job = await db.job.create({
                data: {
                    ...jobData,
                    userId: user.id,
                    companyId: uniqueCompany.id,
                    skills,
                    questions,
                    jobDesc,
                },
            });
        }

        return { success: isEdit ? 'Job has been Edited successfully' : 'Job has been successfully created', data: job };
    } catch (error) {
        console.error("Job creation error:", error);
        return { error: 'Job creation failed. Please try again later.' };
    }
};
