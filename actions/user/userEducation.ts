'use server';

import { UserEducationSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';

export const userEducation = async (values: z.infer<typeof UserEducationSchema>, id: number) => {
    try {
        const validatedFields = UserEducationSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields"};
        }
        const data = validatedFields.data;

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
        return { error: 'User update failed' };
    }
};
