"use server";

import { db } from "@/lib/db";

export const markMessagesAsSeen = async (chatId: number, userId: number) => {

    try {
        await db.message.updateMany({
            where: {
                chatId: chatId,
                senderId: { not: userId },
                isSeen: false,
            },
            data: { isSeen: true },
        });

        return { success: true };
    } catch (error) {
        console.error("Error marking messages as seen:", error);
        return { success: false };
    }
};
