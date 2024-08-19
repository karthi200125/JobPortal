'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";


interface ModelProps {
    children: React.ReactNode;
    className?: string;
    triggerCls?: string;
    title?: string;
    desc?: string;
    bodyContent?: any;
}

const Model = ({ children, className, title, desc, bodyContent, triggerCls }: ModelProps) => {
    return (
        <Dialog>
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
                    {bodyContent}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Model