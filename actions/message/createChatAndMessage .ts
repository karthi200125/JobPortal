"use server";

import { db } from "@/lib/db";

export const createChatAndMessage = async (
    senderId: number,
    receiverId: number,
    messageText: string
) => {
    try {
        if (!senderId || !receiverId || !messageText) {
            throw new Error("Invalid data: senderId, receiverId, and messageText are required");
        }
        
        let chat = await db.chats.findFirst({
            where: {
                OR: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ],
            },
        });

        if (!chat) {
            chat = await db.chats.create({
                data: {
                    senderId,
                    receiverId,
                    lastMessage: messageText,
                },
            });
        }

        const message = await db.message.create({
            data: {
                chatId: chat.id,
                senderId,
                text: messageText,
            },
        });

        await db.chats.update({
            where: {
                id: chat.id,
            },
            data: {
                lastMessage: messageText,
                updatedAt: new Date(),
            },
        });

        return { chat, message, success: true };
    } catch (error) {
        console.error("Error creating chat and message:", error);
        throw new Error("Failed to create chat and message");
    }
};
