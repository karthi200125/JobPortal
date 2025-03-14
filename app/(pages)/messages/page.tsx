"use client";

import Title from "@/lib/MetaTitle";
import ChatLists from "./ChatLists";
import MessageBox from "./MessageBox";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getChatUsers } from "@/actions/message/getChatUsers";
import { useCallback, useEffect, useState } from "react";

const Messages = () => {
    const user = useSelector((state: any) => state.user?.user);
    const [selectedChatUserId, setSelectedChatUserId] = useState<number | null>(null);
    const [q, setQ] = useState('')

    const { data: chatUsers = [], isPending } = useQuery({
        queryKey: ["getChatUsers", user?.id, q],
        queryFn: async () => (user?.id ? await getChatUsers(user.id, q) : []),
        enabled: !!user?.id,
    });

    useEffect(() => {
        if (chatUsers.length > 0 && selectedChatUserId === null) {
            setSelectedChatUserId(chatUsers[0]?.id);
        }
    }, [chatUsers, selectedChatUserId]);

    const handleSelectedChatUser = useCallback((chatUserId: number) => {
        setSelectedChatUserId(chatUserId);
    }, []);

    const chatUser: any = chatUsers.find((user: any) => user?.id === selectedChatUserId) || null;

    return (
        <div className="w-full flex flex-row items-start h-full">
            <Title
                title={`${chatUser?.username || ""} Messages | JOBIFY`}
                description="Stay connected with recruiters and job seekers. Send and receive messages directly on JOBIFY."
                keywords="messages, job messages, recruiter chat, communication, networking"
            />

            <ChatLists
                chatUsers={chatUsers}
                isPending={isPending}
                onSelectedChatUserId={handleSelectedChatUser}
                defaultChatUserId={selectedChatUserId}
                onSearch={(query: string) => setQ(query)}
            />

            <div className="hidden md:block flex-[5] messageh">                
                    <MessageBox
                        receiverId={chatUser?.id}
                        chatUser={chatUser}
                        isLoading={isPending}
                        isChatuser={true}
                    />
            </div>
        </div>
    );
};

export default Messages;
