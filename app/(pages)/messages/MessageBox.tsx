'use client'

import { getConversation } from "@/actions/message/getConversation";
import MessageBoxSkeleton from "@/Skeletons/MessageBoxSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ChatButton from "./ChatButton";
import Chats from "./Chats";
import ChatUser from "./ChatUser";

interface MessageBoxProps {
  receiverId?: number,
  chatUser?: any
}

const MessageBox = ({ receiverId, chatUser }: MessageBoxProps) => {

  const user = useSelector((state: any) => state.user?.user);

  console.log('message box', receiverId)
  console.log('user', chatUser)

  const { data, isPending } = useQuery({
    queryKey: ["getConversation", user?.id, receiverId],
    queryFn: async () => (user?.id && receiverId ? await getConversation(user.id, receiverId) : []),
    enabled: Boolean(user?.id && receiverId),
  });

  return (
    <div className="h-full relative">
      {isPending ?
        <MessageBoxSkeleton />
        :
        <>
          <ChatUser chatUser={chatUser} />

          {/* message show*/}
          <Chats messages={data?.messages} currentUserId={user?.id} isPending={isPending} user={user} />

          {/* chat button */}
          <ChatButton userId={user?.id} receiverId={receiverId!} />
        </>
      }

    </div>
  )
}

export default MessageBox