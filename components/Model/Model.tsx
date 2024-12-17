'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

interface ModelProps {
    children: React.ReactNode;
    className?: string;
    triggerCls?: string;
    title?: string;
    desc?: string;
    bodyContent?: React.ReactNode;
    onClose?: () => void; 
}

const Model = ({ children, className, title, desc, bodyContent, triggerCls, onClose }: ModelProps) => {
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = async () => {
        if (onClose) {
            await onClose(); 
        }
        handleClose(); 
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={`${triggerCls}`}>
                <button>
                    {children}
                </button>
            </DialogTrigger>
            <DialogContent className={`${className} max-h-screen md:max-h-[90vh] overflow-y-auto`}>
                <DialogHeader className="borderb pb-3 sticky top-0 left-0 bg-white">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full max-h-max px-1 pb-6">
                    
                    {React.cloneElement(bodyContent as React.ReactElement, { onClose: handleSuccess })}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Model;
