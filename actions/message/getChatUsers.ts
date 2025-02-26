"use server";

import { db } from "@/lib/db";

export const getChatUsers = async (userId: number) => {
    try {
        const chatusers: any = await db.chats.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            select: {
                receiver: { select: { id: true, username: true, userImage: true } },
                lastMessage: true,
                isSeen: true,
                updatedAt: true,
                createdAt: true,
            },
            orderBy: {
                updatedAt: "desc",
            }
        });

        return chatusers;
    } catch (error) {
        console.error("Error fetching chat users:", error);
    }
};
