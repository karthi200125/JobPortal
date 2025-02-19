'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
    currentPage: number;
    totalJobsCount: number;
}

const CustomPagination = ({ currentPage, totalJobsCount }: CustomPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const jobsPerPage = 10;
    const totalPages = Math.max(1, Math.ceil(totalJobsCount / jobsPerPage));
    
    const updatePageParam = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/jobs?${params.toString()}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            updatePageParam(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            updatePageParam(currentPage + 1);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={currentPage > 1 ? handlePrevious : undefined}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:opacity-50'}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => updatePageParam(page)}
                                className='cursor-pointer hover:opacity-50'
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Ellipsis for Large Page Numbers */}
                {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={currentPage < totalPages ? handleNext : undefined}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:opacity-50'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;
