'use client';

import MessageBox from "@/app/(pages)/messages/MessageBox";
import { openModal } from "@/app/Redux/ModalSlice";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Model from "./Model/Model";
import { memo, useCallback, useMemo, useState } from "react";

interface User {
    id: number;
    username?: string;
    userImage?: string;
}

interface MessageButtonProps {
    receiver: User;
    className?: string;
}

const MessageButton = ({ receiver, className = "" }: MessageButtonProps) => {
    const user = useSelector((state: any) => state.user?.user);
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleOpenModal = useCallback(() => {
        setSelectedUser(receiver);
        dispatch(openModal(`messageModel-${selectedUser?.id}`))
    }, [dispatch, receiver]);

    const messageBoxContent = useMemo(() => (
        <MessageBox receiverId={selectedUser?.id} chatUser={selectedUser} />
    ), [selectedUser]);

    return (
        <>
            <Model
                bodyContent={messageBoxContent}
                title={`Message ${selectedUser?.username || "User"}`}
                className="min-w-[300px] lg:w-[800px]"
                modalId={`messageModel-${selectedUser?.id}`}
            >
                <Button
                    onClick={handleOpenModal}
                    disabled={user?.isPro}
                    variant="border"
                    icon={<IoMdSend size={20} />}
                    className={className}
                >
                    Message
                </Button>
            </Model>
        </>
    );
};

export default memo(MessageButton);
