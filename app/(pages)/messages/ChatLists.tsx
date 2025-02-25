import BottomDrawer from "@/components/BottomDrawer";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";
import { IoSearchOutline } from "react-icons/io5";

const ChatLists = () => {

  const chats = ['one', 'two', 'three', 'one']

  const renderChats = (isMobile: boolean) => {
    // if (isLoading) {
    //     return <JobListsSkeleton />;
    // }

    if (chats?.length === 0) {
      return <h4 className="p-3">No Jobs Found</h4>;
    }

    return chats.map((chat, i) => (
      <div >
        {isMobile ? (
          <BottomDrawer key={i} body={<MessageBox />}>
            <ChatList />
          </BottomDrawer>
        ) : (
          <ChatList />
        )}
      </div>
    ));
  };

  return (
    <div className="w-full md:flex-[2] messageh md:border-r-[1px] border-solid border-neutral-200 pt-3">
      <div className="space-y-5 py-3 pr-3">
        <h3>Messaging</h3>
        <div className="bg-neutral-100 rounded-md flex flex-row items-center gap-3 pl-3">
          <IoSearchOutline />
          <input type="text" className="p-2 w-full bg-neutral-100" placeholder="search.." />
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="md:hidden">{renderChats(true)}</div>
        <div className="hidden md:block">{renderChats(false)}</div>
      </div>
    </div>
  )
}

export default ChatLists