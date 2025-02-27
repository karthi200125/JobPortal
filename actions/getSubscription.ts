'use server';

import { db } from "@/lib/db";

export const getSubscription = async (userId: number) => {
    try {
        const subscription: any = await db.subscription.findUnique({
            where: {
                userId
            },
        });
        return subscription;
    } catch (error) {
        return { error: "Failed to fetch subscription" };
    }
};
