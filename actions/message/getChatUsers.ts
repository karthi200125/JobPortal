"use server";

import { db } from "@/lib/db";

export const getChatUsers = async (userId: number, q?: string) => {
    try {
        const chatusers: any = await db.chats.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ],
                ...(q ? {
                    receiver: {
                        username: { contains: q, mode: "insensitive" }
                    }
                } : {})
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
        return [];
    }
};
