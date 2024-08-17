'use client'

import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { IoMdArrowDropdown } from "react-icons/io";

interface Filter {
    id: number;
    title: string;
    options: string[];
}

const FilterNavbar = () => {
    const filters: Filter[] = [
        {
            id: 1,
            title: "Date Posted",
            options: ['All Time', 'Past 24 hours', 'Past 3 days', 'Past Week', 'Past Month']
        },
        {
            id: 2,
            title: "Experience Level",
            options: ['Internship', 'Entry level', 'Associate', 'Mid Senior Level', 'Director']
        },
        {
            id: 3,
            title: "Type",
            options: ['All', 'Remote', 'OnSite', 'Hybrid']
        },
    ];

    // State to hold the selected options and pending changes
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(
        filters.reduce((acc, filter) => {
            acc[filter.title] = '';
            return acc;
        }, {} as Record<string, string>)
    );
    const [pendingFilters, setPendingFilters] = useState({ ...selectedFilters });
    const [easyapply, setEasyapply] = useState(false)

    const handlePendingSelection = (filterTitle: string, option: string) => {
        setPendingFilters(prev => ({
            ...prev,
            [filterTitle]: prev[filterTitle] === option ? '' : option
        }));
    };

    const applyChanges = () => {
        setSelectedFilters(pendingFilters);
    };

    return (
        <div className=" w-full h-[60px] shadow-md flex flex-row items-center gap-5 overflow-x-auto">
            {filters.map((filter) => (
                <DropdownMenu key={filter.id}>
                    <DropdownMenuTrigger className="trans text-sm font-semibold max-w-max rounded-full h-[35px] border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 px-3 flex items-center gap-2">
                        {selectedFilters[filter.title] || filter.title}
                        <IoMdArrowDropdown size={20} />
                    </DropdownMenuTrigger>

                    {/* Dropdown content */}
                    <DropdownMenuContent className="relative min-w-[300px] min-h-[100px] p-5 flex flex-col">
                        {filter.options.map((opt) => (
                            <div key={opt} className="w-full flex flex-row items-center gap-3 p-3">
                                <input
                                    name={filter.title}
                                    type="radio"
                                    className="w-[20px] h-[20px] cursor-pointer"
                                    checked={pendingFilters[filter.title] === opt}
                                    onChange={() => handlePendingSelection(filter.title, opt)}
                                />
                                <h4 className="text-md">{opt}</h4>
                            </div>
                        ))}
                        <DropdownMenuSeparator />

                        <div className='p-3 w-full flex items-center justify-end flex-row gap-3'>
                            <DropdownMenuItem className='bg-none' onClick={() => setPendingFilters({ ...selectedFilters })}>
                                Cancel
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={applyChanges} className='h-[40px] rounded-full px-5 max-w-max border flexcenter bg-none'>
                                Apply
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}

            {/*  Easy Apply*/}
            <div className={`text-sm font-semibold max-w-max px-3 h-[35px] flexcenter rounded-full border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 cursor-pointer trans ${easyapply === true && "bg-black text-white"}`} onClick={() => setEasyapply(!easyapply)}>
                Easy Apply
            </div>

            {/* Filter */}
            <Sheet>
                <SheetTrigger className='trans font-semibold text-sm max-w-max px-3 h-[35px] flexcenter rounded-full border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 cursor-pointer'>
                    Filters
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>


        </div>
    );
}

export default FilterNavbar;
