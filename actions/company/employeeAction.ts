"use server";

import { db } from "@/lib/db";
import { getUserById } from "../auth/getUserById";

export const employeeAccept = async (empId: number, userId: number) => {
    try {
        // Fetch user data
        const user = await getUserById(userId);

        if (!user || !Array.isArray(user.verifyEmps)) {
            throw new Error("User not found or verifyEmps is not an array");
        }

        // Remove empId from verifyEmps array and push it to employees array
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                verifyEmps: {
                    set: user.verifyEmps.filter((id: number) => id !== empId),
                },
                employees: {
                    push: empId,
                },
            },
        });

        return { success: "Employee Verified Successfully", data: updatedUser };
    } catch (error) {
        console.error("Error in employeeAccept:", error);
        return { error: "Employee verification failed" };
    }
};

export const employeeReject = async (empId: number, userId: number) => {
    try {
        // Fetch user data
        const user = await getUserById(userId);

        if (!user || !Array.isArray(user.verifyEmps)) {
            throw new Error("User not found or verifyEmps is not an array");
        }

        // Remove empId from verifyEmps array
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                verifyEmps: {
                    set: user.verifyEmps.filter((id: number) => id !== empId),
                },
            },
        });

        return { success: "Employee verification rejected", data: updatedUser };
    } catch (error) {
        console.error("Error in employeeReject:", error);
        return { error: "Employee rejection failed" };
    }
};
