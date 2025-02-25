import ChatButton from "./ChatButton";
import Chats from "./Chats";
import ChatUser from "./ChatUser";

const MessageBox = () => {
  return (
    <div className="h-full relative">
      <ChatUser />

      {/* message show*/}
      <Chats />

      {/* chat button */}
      <ChatButton />

    </div>
  )
}

export default MessageBox