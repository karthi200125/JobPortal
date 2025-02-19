'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { DatePosted, experiences, getStates, JobMode } from '@/getOptionsData';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '@/actions/company/getCompanies';

interface Filter {
    id: number;
    title: string;
    options: string[];
}

const FilterNavbar = () => {
    const router = useRouter();

    // Fetching states and companies using react-query
    const { data: states = [] } = useQuery({ queryKey: ['getStates'], queryFn: getStates });
    // const { data: companies = [] } = useQuery({ queryKey: ['getCompanies'], queryFn: getCompanies });

    const { data: companies = [] } = useQuery({
        queryKey: ['getCompanies'],
        queryFn: async () => await getCompanies(),
    });

    // Memoizing derived state values
    const companiesOptions = companies?.map((company: any) => company?.companyName) || [];
    // const companiesOptions = useMemo(() => companies?.map((company: any) => company?.companyName) || [], [companies]);
    const locations = useMemo(() => states?.map((state: any) => state.name) || [], [states]);

    // Filters data
    const filters: Filter[] = [
        { id: 1, title: "Date Posted", options: DatePosted },
        { id: 2, title: "Experience Level", options: experiences },
        { id: 3, title: "Type", options: JobMode },
        { id: 4, title: "Location", options: locations },
        { id: 5, title: "Company", options: companiesOptions },
    ];

    // Initialize filter states
    const defaultFilters = useMemo(() => filters.reduce((acc, filter) => {
        acc[filter.title] = '';
        return acc;
    }, {} as Record<string, string>), [filters]);

    const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
    const [pendingFilters, setPendingFilters] = useState({ ...defaultFilters });
    const [easyapply, setEasyapply] = useState(false);

    // Handle selection of filters
    const handlePendingSelection = useCallback((filterTitle: string, option: string) => {
        setPendingFilters(prev => ({
            ...prev,
            [filterTitle]: prev[filterTitle] === option ? '' : option
        }));
    }, []);

    // Apply selected filters
    const applyChanges = useCallback(() => {
        setSelectedFilters(pendingFilters);
        updateUrlParams(pendingFilters, easyapply);
    }, [pendingFilters, easyapply]);

    // Reset all filters
    const resetFilter = useCallback(() => {
        setSelectedFilters(defaultFilters);
        setPendingFilters(defaultFilters);
        setEasyapply(false);
        router.push(`/jobs`);
    }, [defaultFilters, router]);

    // Update URL parameters based on selected filters
    const updateUrlParams = useCallback((filters: Record<string, string>, easyapply: boolean) => {
        const searchParams = new URLSearchParams();

        Object.keys(filters).forEach(filterKey => {
            if (filters[filterKey]) {
                searchParams.set(filterKey.toLowerCase().replace(/ /g, ''), filters[filterKey]);
            }
        });

        if (easyapply) {
            searchParams.set('easyApply', 'true');
        }

        router.push(`/jobs?${searchParams.toString()}`);
    }, [router]);

    useEffect(() => {
        updateUrlParams(selectedFilters, easyapply);
    }, [selectedFilters, easyapply, updateUrlParams]);

    return (
        <div className="whitespace-nowrap w-full h-[60px] shadow-md flex flex-row items-center gap-5 md:gap-5 overflow-x-auto">
            {filters.map((filter) => {
                const isActive = selectedFilters[filter.title] !== '';

                return (
                    <DropdownMenu key={filter.id}>
                        <DropdownMenuTrigger
                            className={`text-sm font-semibold max-w-max rounded-full h-[35px] border-[1px] filterborder hover:border-neutral-600 border-solid px-3 flex items-center gap-2 transition ${isActive ? 'border-[var(--voilet)] !border-[3px] text-[var(--voilet)] font-bold' : 'border-neutral-300'
                                }`}
                        >
                            {selectedFilters[filter.title] || filter.title}
                            <IoMdArrowDropdown size={20} />
                        </DropdownMenuTrigger>

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
                );
            })}

            {/* Easy Apply */}
            <div
                className={`text-sm font-semibold max-w-max px-3 h-[35px] flexcenter rounded-full border-[1px] filterborder hover:border-neutral-600 border-solid cursor-pointer transition ${easyapply ? "bg-[var(--voilet)] text-white border-[var(--voilet)] " : "border-neutral-300"
                    }`}
                onClick={() => setEasyapply(!easyapply)}
            >
                Easy Apply
            </div>

            {/* Reset */}
            <div className="text-neutral-600 font-semibold cursor-pointer transition hover:text-black" onClick={resetFilter}>
                Reset
            </div>
        </div>
    );
};

export default FilterNavbar;
