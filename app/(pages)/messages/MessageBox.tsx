'use client'

import { useQuery } from "@tanstack/react-query";
import ChatButton from "./ChatButton";
import Chats from "./Chats";
import ChatUser from "./ChatUser";
import { useSelector } from "react-redux";
import { getConversation } from "@/actions/message/getConversation";
import { getUserById } from "@/actions/auth/getUserById";

interface MessageBoxProps {
  receiverId?: number,
  chatUser?: any  
}

const MessageBox = ({ receiverId, chatUser }: MessageBoxProps) => {

  const user = useSelector((state: any) => state.user?.user);

  const { data, isPending } = useQuery({
    queryKey: ["getConversation", user?.id, receiverId],
    queryFn: async () => (user?.id && receiverId ? await getConversation(user.id, receiverId) : []),
    enabled: Boolean(user?.id && receiverId),
  });

  return (
    <div className="h-full relative">
      {isPending ?
        "loasing... "
        :
        <>
          <ChatUser chatUser={chatUser} />

          {/* message show*/}
          <Chats messages={data} currentUserId={user?.id} isPending={isPending} />

          {/* chat button */}
          <ChatButton userId={user?.id} receiverId={receiverId!} />
        </>
      }

    </div>
  )
}

export default MessageBox