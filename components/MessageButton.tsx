'use client';

import MessageBox from "@/app/(pages)/messages/MessageBox";
import { openModal } from "@/app/Redux/ModalSlice";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Model from "./Model/Model";
import { memo, useCallback, useMemo } from "react";

interface MessageButtonProps {
    receiver?: { id: number; username: string };
    className?: string;
}

const MessageButton = ({ receiver, className = "" }: MessageButtonProps) => {
    const user = useSelector((state: any) => state.user?.user, (prev, next) => prev?.id === next?.id);
    const dispatch = useDispatch();

    const handleOpenModal = useCallback(() => {
        dispatch(openModal("messageModel"));
    }, [dispatch]);

    const messageBoxContent = useMemo(
        () => <MessageBox receiverId={receiver?.id} chatUser={user} />,
        [receiver?.id, user]
    );

    return (
        <div>
            <Model
                bodyContent={messageBoxContent}
                title={`Message ${receiver?.username || "User"}`}
                className={`min-w-[300px] lg:w-[800px] ${className}`}
                modalId="messageModel"
            >
                <Button
                    onClick={handleOpenModal}
                    disabled={user?.isPro}
                    variant="border"
                    icon={<IoMdSend size={20} />}
                >
                    Message
                </Button>
            </Model>
        </div>
    );
};

export default memo(MessageButton);
