"use server";

import { db } from "@/lib/db";

export const getChatUsers = async (userId: number) => {
    try {
        const chatusers = await db.chats.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            select: {
                senderId: true,
                receiverId: true,
                receiver: { select: { id: true, username: true, userImage: true } },
                sender: { select: { id: true, username: true, userImage: true } },
                lastMessage: true,
                isSeen: true,
                updatedAt: true,
                createdAt: true,
            },
            orderBy: {
                updatedAt: "desc",
            }
        });
        
        const uniqueUsersMap = new Map();

        chatusers.forEach(chat => {
            const otherUser = chat.senderId === userId ? chat.receiver : chat.sender;
            if (otherUser && !uniqueUsersMap.has(otherUser.id)) {
                uniqueUsersMap.set(otherUser.id, {
                    id: otherUser.id,
                    username: otherUser.username,
                    userImage: otherUser.userImage,
                    lastMessage: chat.lastMessage,
                    isSeen: chat.isSeen,
                    updatedAt: chat.updatedAt,
                    createdAt: chat.createdAt
                });
            }
        });

        return Array.from(uniqueUsersMap.values());
    } catch (error) {
        console.error("Error fetching chat users:", error);
        return [];
    }
};
