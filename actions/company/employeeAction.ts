'use server';

import { db } from "@/lib/db";
import { getUserById } from "../auth/getUserById";

export const employeeAccept = async (empId: any, userId: any) => {
    try {
        // Fetch user data
        const user = await getUserById(userId);

        if (!user || !user.verifyEmps) {
            throw new Error("User not found or verifyEmps is null");
        }

        // Remove empId from verifyEmps array
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                verifyEmps: {
                    set: user.verifyEmps.filter((id: any) => id !== empId),
                },
            },
        });

        // Add empId to employees array
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                employees: {
                    push: empId,
                },
            },
        });

        return { success: "Employee Verified Successfully", data: user };
    } catch (err) {
        return { error: "Employee verification failed" };
    }
};

export const employeeReject = async (empId: any, userId: any) => {
    try {
        // Fetch user data
        const user = await getUserById(userId);

        if (!user || !user.verifyEmps) {
            throw new Error("User not found or verifyEmps is null");
        }

        // Remove empId from verifyEmps array
        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                verifyEmps: {
                    set: user.verifyEmps.filter((id: any) => id !== empId),
                },
            },
        });

        return { success: "Employee verification rejected", data: user };
    } catch (err) {
        return { error: "Employee rejection failed" };
    }
};
