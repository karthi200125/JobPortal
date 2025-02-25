'use client'

import Title from "@/lib/MetaTitle";
import ChatLists from "./ChatLists";
import MessageBox from "./MessageBox";

const Messages = () => {


    return (
        <div className="w-full flex flex-row items-start h-full">
            <Title
                title="Messages | JOBIFY"
                description="Stay connected with recruiters and job seekers. Send and receive messages directly on JOBIFY."
                keywords="messages, job messages, recruiter chat, communication, networking"
            />

            <ChatLists />

            <div className="hidden md:block flex-[5] messageh">
                <MessageBox />
            </div>
        </div>
    )
}

export default Messages
