'use client';

import { useState, useEffect } from 'react';
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
import { experiences, getStates, JobMode } from '@/getOptionsData';
import { useRouter } from 'next/navigation';
import Filter from './Filter';
import { useQuery } from '@tanstack/react-query';

interface Filter {
    id: number;
    title: string;
    options: string[];
}

const FilterNavbar = () => {
    const router = useRouter();

    const { data: states = [], isLoading: statesLoading } = useQuery({
        queryKey: ['getStates'],
        queryFn: async () => await getStates(),
    });

    const locations = states.map((state: any) => state.name)

    const filters: Filter[] = [
        {
            id: 1,
            title: "Date Posted",
            options: ['All Time', 'Past 24 hours', 'Past 3 days', 'Past Week', 'Past Month']
        },
        {
            id: 2,
            title: "Experience Level",
            options: experiences
        },
        {
            id: 3,
            title: "Type",
            options: JobMode
        },
        {
            id: 4,
            title: "Location",
            options: locations
        },
    ];

    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(
        filters.reduce((acc, filter) => {
            acc[filter.title] = '';
            return acc;
        }, {} as Record<string, string>)
    );
    const [pendingFilters, setPendingFilters] = useState({ ...selectedFilters });
    const [easyapply, setEasyapply] = useState(false);

    // Handle the filter change
    const handlePendingSelection = (filterTitle: string, option: string) => {
        setPendingFilters(prev => ({
            ...prev,
            [filterTitle]: prev[filterTitle] === option ? '' : option
        }));
    };

    const applyChanges = () => {
        setSelectedFilters(pendingFilters);
        updateUrlParams(pendingFilters, easyapply);
    };

    // Update the URL parameters whenever filters are applied
    const updateUrlParams = (filters: Record<string, string>, easyapply: boolean) => {
        const searchParams = new URLSearchParams(window.location.search);

        // Update filters in URL
        Object.keys(filters).forEach(filterKey => {
            if (filters[filterKey]) {
                searchParams.set(filterKey.toLowerCase().replace(/ /g, ''), filters[filterKey]);
            } else {
                searchParams.delete(filterKey.toLowerCase().replace(/ /g, ''));
            }
        });

        // Handle easy apply filter
        if (easyapply) {
            searchParams.set('easyApply', 'true');
        } else {
            searchParams.delete('easyApply');
        }

        // Push the updated query to the URL
        router.push(`/jobs?${searchParams.toString()}`);
    };

    useEffect(() => {
        updateUrlParams(selectedFilters, easyapply);
    }, [easyapply]);

    return (
        <div className="whitespace-nowrap w-full h-[60px] shadow-md flex flex-row items-center gap-5 md:gap-5 overflow-x-auto">
            {filters.map((filter) => (
                <DropdownMenu key={filter.id}>
                    <DropdownMenuTrigger className="trans text-sm font-semibold max-w-max rounded-full h-[35px] border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 px-3 flex items-center gap-2">
                        {selectedFilters[filter.title] || filter.title}
                        <IoMdArrowDropdown size={20} />
                    </DropdownMenuTrigger>

                    {/* Dropdown content */}
                    <DropdownMenuContent className="relative min-w-[300px] max-h-[400px] p-2 md:p-5 flex flex-col overflow-scroll">
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

            {/*  Easy Apply */}
            <div
                className={`text-sm font-semibold max-w-max px-3 h-[35px] flexcenter rounded-full border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 cursor-pointer trans ${easyapply && "bg-black text-white"}`}
                onClick={() => setEasyapply(!easyapply)}
            >
                Easy Apply
            </div>

            {/* Filter */}
            <Sheet>
                <SheetTrigger className='trans font-semibold text-sm max-w-max px-3 h-[35px] flexcenter rounded-full border-[1px] filterborder hover:border-neutral-600 border-solid border-neutral-300 cursor-pointer'>
                    All Filters
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filter</SheetTitle>
                        <Filter />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default FilterNavbar;
