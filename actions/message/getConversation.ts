"use server";

import { db } from "@/lib/db";
import moment from "moment";

export const getConversation = async (userId: number, otherUserId: number) => {
    try {
        // Find the chat between these two users
        const chat = await db.chats.findFirst({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            select: {
                id: true, 
                messages: {
                    select: {
                        id: true,
                        senderId: true,
                        text: true,
                        image: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: "asc", 
                    },
                },
            },
        });

        if (!chat) return [];

        return chat.messages.map(msg => ({
            id: msg.id,
            senderId: msg.senderId,            
            message: msg.text || "",
            image: msg.image || null,
            sentAt: moment(msg.createdAt).format("MMM D, h:mm A"),
        }));
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw new Error("Failed to fetch conversation");
    }
};
