'use server'

import { db } from '@/lib/db';

export async function applyForJob(
  userId: number,
  jobId: number,
  candidateEmail: string,
  candidateMobile: string,
  candidateResume: string,
  questionAndAnswers: any
) {
  try {
    
    await db.jobApplication.create({
      data: {
        userId,
        jobId,
        candidateEmail,
        candidateMobile,
        candidateResume,
        questionAndAnswers
      },
    });

    return { success: "Job applied successfully" };
  } catch (error) {
    console.log(error)
    return { error: 'Error applying for job' }
  }
}


export const getJobTitles = async (search: string) => {
  try {
    const jobTitles = await db.job.findMany({
      where: {
        jobTitle: {
          contains: search,
          mode: 'insensitive',
        },
      },
      select: {
        jobTitle: true,
      },
    });
    return jobTitles;
  } catch (err) {
    return 'Failed to fetch job titles';
  }
};
