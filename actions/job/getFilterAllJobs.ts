'use server';

import { db } from "@/lib/db";

export const getFilterAllJobs = async (userId: string, searchParams: any) => {

    const { easyApply, dateposted, experiencelevel, type, location, q, company, page = 1 } = searchParams;

    const ITEM_PER_PAGE = 10;
    const currentPage = Number(page) || 1;

    try {
        const filters: any = {};

        if (q) {
            filters.jobTitle = {
                contains: q,
                mode: 'insensitive',
            };
        }

        if (easyApply) {
            filters.isEasyApply = true;
        }

        if (company) {
            filters.company = {
                companyName: {
                    contains: company,
                    mode: 'insensitive',
                }
            };
        }

        if (dateposted) {
            const now = new Date();
            switch (dateposted) {
                case 'Past 24 hours':
                    filters.createdAt = { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) };
                    break;
                case 'Past 3 days':
                    filters.createdAt = { gte: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) };
                    break;
                case 'Past Week':
                    filters.createdAt = { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
                    break;
                case 'Past Month':
                    filters.createdAt = { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
                    break;
                default:
                    break;
            }
        }

        if (type) {
            filters.mode = type;
        }

        if (experiencelevel) {
            filters.experience = experiencelevel;
        }

        if (location) {
            filters.state = location;
        }

        const totalCount = await db.job.count({
            where: {
                AND: [
                    { ...filters },
                    {
                        NOT: [
                            { userId },  
                            {
                                company: {
                                    userId,  
                                },
                            },
                            {
                                jobApplications: {
                                    some: { userId }, 
                                },
                            },
                        ],
                    },
                ],
            },
        });
        
        const allJobs:any = await db.job.findMany({
            where: {
                AND: [
                    { ...filters },
                    {
                        NOT: [
                            { userId },  
                            {
                                company: {
                                    userId,  
                                },
                            },
                            {
                                jobApplications: {
                                    some: { userId }, 
                                },
                            },
                        ],
                    },
                ],
            },
            include: {
                company: true, 
                jobApplications: true,
            },
            orderBy: { createdAt: 'desc' },
            take: ITEM_PER_PAGE,
            skip: (currentPage - 1) * ITEM_PER_PAGE,
        });

        return { jobs: allJobs, count: totalCount };
    } catch (err) {
        console.log(err)        
        return { error: "Failed to fetch jobs" };
    }
};
