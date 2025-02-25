import BottomDrawer from "@/components/BottomDrawer";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";
import { IoSearchOutline } from "react-icons/io5";

const ChatLists = () => {
  const chats = ["one", "two", "three", "one"];

  const renderChats = (isMobile: boolean) => {
    if (chats.length === 0) {
      return <h4 className="p-3">No Chat Users Yet!</h4>;
    }

    return chats.map((chat, i) => (
      <div key={i}>
        {isMobile ? (
          <BottomDrawer body={<MessageBox />}>
            <ChatList />
          </BottomDrawer>
        ) : (
          <ChatList />
        )}
      </div>
    ));
  };

  return (
    <div className="w-full md:flex-[2] messageh md:border-r border-neutral-200 pt-3">
      <div className="space-y-5 py-3 md:pr-3">
        <h3>Messaging</h3>
        <div className="bg-neutral-100 rounded-md flex items-center gap-3 pl-3">
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
