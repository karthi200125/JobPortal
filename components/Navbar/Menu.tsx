'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenu3Line } from "react-icons/ri";

const Menu = () => {
    return (
        <div className='md:hidden w-[40px] h-[40px] rounded-md bg-white/10 flexcenter text-white'>
            <Sheet >
                <SheetTrigger>
                    <RiMenu3Line size={25} />
                </SheetTrigger>
                <SheetContent className="w-full h-screen">
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>

                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Menu