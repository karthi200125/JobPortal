'use server';

import { RegisterSchema } from '@/lib/SchemaTypes';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    try {
        const validatedFields = RegisterSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields" };
        }

        const { email, password, username, role } = validatedFields.data;

        const existingUserName = await db.user.findUnique({
            where: { username }
        });

        if (existingUserName) {
            return { error: "Username already exists" };
        }

        const existingEmail = await db.user.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return { error: "Email already exists" };
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                role,
                password: hashedPassword,
            }
        });

        return { success: 'User registration successful', data: newUser };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: 'User registration failed' };
    }
};
