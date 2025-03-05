'use server';

import { UserInfoSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';

export const UserUpdate = async (
    values: z.infer<typeof UserInfoSchema>,
    id: number,
    userAbout?: string 
) => {
    try {
        const validatedFields = UserInfoSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }
        const data = validatedFields.data;

        if (data?.currentCompany) {
            const company = await db.company.findUnique({
                where: { companyName: data.currentCompany },
                select: { userId: true }
            });

            if (company?.userId) {
                const existingUser = await db.user.findUnique({
                    where: { id: company.userId },
                    select: { verifyEmps: true, employees: true },
                });
                
                if (existingUser && !existingUser.employees?.includes(id)) {
                    await db.user.update({
                        where: { id: company.userId },
                        data: { verifyEmps: { push: id } },
                    });
                }
            }
        }

        const updatedUser = await db.user.update({
            where: { id },
            data: {
                ...data,
                userAbout: JSON.parse(JSON.stringify(userAbout))
            },
        });

        return { success: 'User updated successfully', data: updatedUser };
    } catch (error) {
        console.log(error);
        return { error: 'User update failed' };
    }
};
