'use server';

import { UserInfoSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';

export const UserUpdate = async (values: z.infer<typeof UserInfoSchema>, id: number) => {
    try {
        const validatedFields = UserInfoSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }
        const data = validatedFields.data;

        if (data?.currentCompany) {
            const company = await db.company.findUnique({
                where: {
                    companyName: data?.currentCompany
                },
                select: {
                    userId: true
                }
            });

            // Update the user record and push the id into verifyEmps array
            if (company?.userId) {
                await db.user.update({
                    where: {
                        id: company.userId,
                    },
                    data: {
                        verifyEmps: {
                            push: id,
                        },
                    },
                });
            }
        }

        // Update the user with the new information
        const updatedUser = await db.user.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            },
        });

        return { success: 'User updated successfully', data: updatedUser };
    } catch (error) {
        console.log(error)
        return { error: 'User update failed' };
    }
};
