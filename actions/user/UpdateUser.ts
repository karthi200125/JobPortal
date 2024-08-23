'use server';

import { UserInfoSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import * as z from 'zod';

export const UserUpdate = async (values: z.infer<typeof UserInfoSchema>, id: number) => {
    try {
        const validatedFields = UserInfoSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields", details: validatedFields.error.errors };
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
