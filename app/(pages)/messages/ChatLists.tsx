"use client";

import BottomDrawer from "@/components/BottomDrawer";
import { IoSearchOutline } from "react-icons/io5";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";
import EmployeesSkeleton from "@/Skeletons/EmployeesSkeleton";
import { useCallback, useEffect, useState } from "react";

interface ChatUsersProps {
  chatUsers: any[];
  isPending?: boolean;
  onSelectedChatUserId?: (id: number) => void;
  defaultChatUserId?: number | null;
}

const ChatLists = ({ chatUsers, isPending, onSelectedChatUserId, defaultChatUserId }: ChatUsersProps) => {
  const [selectedChatUserId, setSelectedChatUserId] = useState<number | null>(defaultChatUserId || null);

  useEffect(() => {
    if (defaultChatUserId) {
      setSelectedChatUserId(defaultChatUserId);
    }
  }, [defaultChatUserId]);

  const handleSelectChatUserId = useCallback(
    (chatUserId: number) => {
      setSelectedChatUserId(chatUserId);
      onSelectedChatUserId?.(chatUserId);
    },
    [onSelectedChatUserId]
  );

  const renderChats = (isMobile: boolean) => {
    if (isPending) return <EmployeesSkeleton count={5} />;
    if (!chatUsers || chatUsers.length === 0) return <h4 className="p-3">No Chat Users Yet!</h4>;

    return chatUsers.map((chatUser) => (
      <div key={chatUser.id} onClick={() => handleSelectChatUserId(chatUser?.receiver?.id)}>
        {isMobile ? (
          <BottomDrawer body={<MessageBox receiverId={chatUser.id} chatUser={chatUser} />}>
            <ChatList chatUser={chatUser} selectedChatUserId={selectedChatUserId} />
          </BottomDrawer>
        ) : (
          <ChatList chatUser={chatUser} selectedChatUserId={selectedChatUserId} />
        )}
      </div>
    ));
  };

  return (
    <div className="w-full md:flex-[2] messageh md:border-r border-neutral-200 pt-3 md:pr-3">
      <div className="space-y-5 py-3">
        <h3>Messaging</h3>
        <div className="bg-neutral-100 rounded-md flex items-center gap-3 pl-3 overflow-hidden">
          <IoSearchOutline />
          <input type="text" className="p-2 w-full bg-neutral-100" placeholder="Search..." />
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="md:hidden">{renderChats(true)}</div>
        <div className="hidden md:block">{renderChats(false)}</div>
      </div>
    </div>
  );
};

export default ChatLists;
