'use client'

import Button from "./Button"
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { experiences } from "@/getOptionsData";
import SearchSkills from "./searchSkills";


const Search = ({ onClose }: any) => {

    const [searchOpen, setSearchOpen] = useState(false)

    const HandleClose = () => {
        setSearchOpen(true)
        onClose(searchOpen)
    }

    return (
        <div className="w-full h-full flexcenter px-4 py-2">
            <div className="w-full md:max-w-max mx-auto h-full text-white bg-white/10 rounded-xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-3">
                <SearchSkills />
                <Select>
                    <SelectTrigger className="w-full md:w-[300px] bg-black rounded-full h-[50px] md:h-full focus:outline-none">
                        <SelectValue placeholder="Select Experince" className="text-white/40" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {experiences.map((exp) => (
                            <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input
                    type="text"
                    className="bg-black text-white text-sm placeholder:text-white/40 w-full md:w-[300px] md:h-full rounded-full h-[50px] pl-5"
                    placeholder="City , state"
                />
                <Button
                    icon={<IoSearchOutline size={25} />}
                    className="bg-white !text-black"
                >
                    Search
                </Button>
                <Button
                    icon={<IoClose size={20} />}
                    className="bg-black !text-red-400"
                    onClick={HandleClose}
                >
                    Close
                </Button>
            </div>
        </div>
    )
}

export default Search