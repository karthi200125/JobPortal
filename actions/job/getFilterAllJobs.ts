'use server';

import { db } from "@/lib/db";

export const getFilterAllJobs = async (userId: any, searchParams: any) => {
    const { easyApply, dateposted, experiencelevel, type, location, q, company } = searchParams;

    const ITEM_PER_PAGE = 10;
    
    try {
        const filters: any = {};

        if (q) {
            filters.jobTitle = {
                contains: q,
                mode: 'insensitive',
            };
        }

        // Easy Apply filter
        if (easyApply) {
            filters.isEasyApply = true;
        }

        // Company filter
        if (company) {
            filters.company = {
                companyName: {
                    contains: company,
                    mode: 'insensitive',
                }
            };
        }

        // Date posted filter
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

        // Job type filter
        if (type) {
            filters.mode = type;
        }

        // Experience level filter
        if (experiencelevel) {
            filters.experience = experiencelevel;
        }

        // Experience level filter
        if (location) {
            filters.state = location;
        }

        // Fetch filtered jobs
        const allJobs: any = await db.job.findMany({
            where: {
                AND: [
                    filters,
                    {
                        NOT: {
                            jobApplications: {
                                some: { userId },
                            },
                        },
                    },
                ],
            },
            include: {
                jobApplications: true,
            },
            orderBy: { createdAt: 'desc' },
            take: ITEM_PER_PAGE,
        });

        return allJobs;
    } catch (err) {
        return { error: "Failed to fetch jobs" };
    }
};
