'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getConversation = async (currentUserId: number, otherUserId: number) => {

    console.log(currentUserId, otherUserId)

    try {
        const chat = await prisma.chats.findFirst({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: currentUserId },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        return chat;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
    }
};
