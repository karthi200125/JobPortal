'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getConversation = async (currentUserId: number, otherUserId: number) => {
    try {
        const chat: any = await prisma.chats.findFirst({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: currentUserId },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                    take: 30,
                    include: {
                        sender: {
                            select: {
                                userImage: true,
                            },
                        },
                    },
                },                
            },
        });

        return chat;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
    }
};
