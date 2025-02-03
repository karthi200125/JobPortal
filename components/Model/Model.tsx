"use client";

import { closeModal, openModal } from "@/app/Redux/ModalSlice";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface ModelProps {
    modalId: string; 
    children: React.ReactNode;
    className?: string;
    triggerCls?: string;
    title?: string;
    desc?: string;
    bodyContent?: React.ReactNode;
}

const Model = ({ modalId, children, className, title, desc, bodyContent, triggerCls }: ModelProps) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: any) => state.modal.modals[modalId] || false); 

    const handleClose = () => {
        dispatch(closeModal(modalId));
    };

    const handleOpen = () => {
        dispatch(openModal(modalId)); 
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogTrigger asChild className={triggerCls}>
                <button onClick={handleOpen}>
                    {children}
                </button>
            </DialogTrigger>
            <DialogContent className={`${className} max-h-screen md:max-h-[90vh] overflow-y-auto`}>
                <DialogHeader className="borderb pb-3 sticky top-0 left-0 bg-white">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{desc}</DialogDescription>
                </DialogHeader>
                <div className="w-full max-h-max px-1 pb-6">
                    {React.cloneElement(bodyContent as React.ReactElement, { onClose: handleClose })}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Model;
