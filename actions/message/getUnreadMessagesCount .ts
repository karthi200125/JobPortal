"use server";

import { db } from "@/lib/db";

export const getUnreadMessagesCount = async (userId: number) => {
    try {
        const count = await db.message.count({
            where: {
                isSeen: false,
                chat: { receiverId: userId } 
            },
        });

        return count;
    } catch (error) {
        console.error("Error fetching unread messages count:", error);
        return 0;
    }
};
