"use server";

import { db } from "@/lib/db";

export const markMessagesAsSeen = async (userId: number) => {
    try {
        const updatedMessages = await db.message.updateMany({
            where: {
                chat: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId },
                    ],
                },
                senderId: { not: userId },
                isSeen: false,
            },
            data: { isSeen: true },
        });

        return { success: true, updatedCount: updatedMessages.count };
    } catch (error) {
        console.error("Error marking messages as seen:", error);
        return { success: false };
    }
};
