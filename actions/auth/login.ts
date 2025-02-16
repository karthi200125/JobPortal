'use server';

import { LoginSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>, role?: any) => {
    try {
        const validatedFields = LoginSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        const { email, password } = validatedFields.data;

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (!existingUser || !existingUser.password) {
            return { error: "Email or password incorrect" };
        }

        if (existingUser.role !== role) {
            return { error: "User role does not match" };
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return { error: "Email or password incorrect" };
        }

        return { success: 'User login successful', data: existingUser };
    } catch (error) {
        console.error("Login error:", error);
        return { error: 'User login failed' };
    }
};
