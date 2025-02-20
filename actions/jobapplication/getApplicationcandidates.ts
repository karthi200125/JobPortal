'use server';

import { db } from "@/lib/db";

export const getApplicationCandidates = async (jobId: number, type: 'Top Applicants' | 'Early Applicants' = 'Early Applicants') => {
    try {
        let jobApplicationCandidates: any;

        if (type === 'Top Applicants') {
            const job = await db.job.findUnique({
                where: { id: jobId },
                select: {
                    skills: true,
                    experience: true,
                    state: true
                }
            });

            if (!job) {
                return { error: "Job not found." };
            }

            jobApplicationCandidates = await db.jobApplication.findMany({
                where: { jobId },
                include: {
                    user: true,
                    job: true,
                }
            });

            // Sorting logic for top applicants
            jobApplicationCandidates.sort((a: any, b: any) => {
                const userA = a.user;
                const userB = b.user;

                // 1. Experience Match (Closer experience to job requirement is better)
                const experienceDifferenceA = Math.abs(parseInt(userA.experience || "0") - parseInt(job.experience || "0"));
                const experienceDifferenceB = Math.abs(parseInt(userB.experience || "0") - parseInt(job.experience || "0"));
                if (experienceDifferenceA !== experienceDifferenceB) return experienceDifferenceA - experienceDifferenceB;

                // 2. Skills Match (More matching skills are better)
                const skillsMatchA = userA?.skills?.filter((skill: any) => job.skills.includes(skill)).length;
                const skillsMatchB = userB?.skills?.filter((skill: any) => job.skills.includes(skill)).length;
                if (skillsMatchA !== skillsMatchB) return skillsMatchB - skillsMatchA;

                // 3. Location Match (Same state is better)
                if (userA.state === job.state && userB.state !== job.state) return -1;
                if (userB.state === job.state && userA.state !== job.state) return 1;

                // 4. Profile Views (Higher is better)
                const profileViewsA = userA.ProfileViews?.length || 0;
                const profileViewsB = userB.ProfileViews?.length || 0;
                if (profileViewsA !== profileViewsB) return profileViewsB - profileViewsA;
                
                // 5. Pro User Priority
                if (userA.isPro !== userB.isPro) return userB.isPro ? 1 : -1;
                            
                return 0;
            });

        } else {
            // Get Early Applicants (Oldest applications first)
            jobApplicationCandidates = await db.jobApplication.findMany({
                where: { jobId },
                include: {
                    user: true,
                    job: true,
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
        }

        return jobApplicationCandidates;
    } catch (error) {
        console.error("Error fetching job application candidates:", error);
        return { error: "Failed to retrieve applied job candidates." };
    }
};
