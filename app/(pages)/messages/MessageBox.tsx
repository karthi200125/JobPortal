"use client";

import { getConversation } from "@/actions/message/getConversation";
import MessageBoxSkeleton from "@/Skeletons/MessageBoxSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ChatButton from "./ChatButton";
import Chats from "./Chats";
import ChatUser from "./ChatUser";
import { useEffect } from "react";
import { markMessagesAsSeen } from "@/actions/message/markMessagesAsSeen ";

interface MessageBoxProps {
  receiverId?: number;
  chatUser?: any;
  isLoading?: boolean;
  isChatuser?: boolean;
}

const MessageBox = ({ receiverId, chatUser, isLoading , isChatuser}: MessageBoxProps) => {
  const user = useSelector((state: any) => state.user?.user);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["getConversation", user?.id, receiverId],
    queryFn: async () => {
      if (!user?.id || !receiverId) return [];
      return await getConversation(user.id, receiverId);
    },
    enabled: Boolean(user?.id && receiverId),
  });

  useEffect(() => {
    const markMessagesAsSeenAsync = async () => {
      if (data?.id && user?.id) {
        try {
          const response = await markMessagesAsSeen(data.id, user.id);
          if (response.success) {
            queryClient.invalidateQueries({ queryKey: ["getUnreadMessagesCount", user?.id] });
          }
        } catch (error) {
          console.error("Error marking messages as seen:", error);
        }
      }
    };

    markMessagesAsSeenAsync();
  }, [data?.id, user?.id, queryClient]);

  return (
    <div className="h-full relative">
      {isPending || isLoading ? (
        <MessageBoxSkeleton />
      ) : (
        <>
          <ChatUser chatUser={chatUser} isChatuser={isChatuser}/>
          <Chats messages={data?.messages} currentUserId={user?.id} isPending={isPending} user={user} />
          <ChatButton userId={user?.id} receiverId={receiverId!} />
        </>
      )}
    </div>
  );
};

export default MessageBox;
