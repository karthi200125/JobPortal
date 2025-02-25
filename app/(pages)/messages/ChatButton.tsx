'use client';

import { createChatAndMessage } from "@/actions/message/createChatAndMessage ";
import Button from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";

const ChatButton = ({ userId, receiverId }: { userId: number; receiverId: number }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [messageText, setMessageText] = useState('');

    const queryClient = useQueryClient();

    const handleClick = async () => {
        if (!messageText.trim()) return;
        try {
            setIsLoading(true);
            await createChatAndMessage(userId, receiverId, messageText)
                .then((data) => {
                    console.log(data)
                    if (data?.success === true) {
                        queryClient.invalidateQueries({ queryKey: ['getChatUsers', userId] })
                        queryClient.invalidateQueries({ queryKey: ['getConversation', userId, receiverId] })
                        setMessageText('');
                    }
                })
        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute bottom-0 md:bottom-3 left-0 w-full flex items-center justify-between gap-2 md:gap-5 px-3 border-t border-neutral-200 py-3 bg-white z-10">
            <input type="file" hidden id="chatfileselect" accept="file/*" />
            <input type="file" hidden id="chatimageselect" accept="image/*" />

            <label htmlFor="chatimageselect" className="cursor-pointer transition hover:opacity-50">
                <MdAttachFile size={30} />
            </label>
            <label htmlFor="chatfileselect" className="cursor-pointer transition hover:opacity-50">
                <CiImageOn size={30} />
            </label>

            <input
                type="text"
                className="w-full bg-neutral-100 p-2 rounded-md"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
            />

            <Button isLoading={isLoading} onClick={handleClick} className="flex items-center gap-2">
                <h4 className="hidden md:block">Send</h4>
                <IoMdSend size={20} />
            </Button>
        </div>
    );
};

export default ChatButton;
