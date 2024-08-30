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

    return { success: "Job applied successfully with additional data." };
  } catch (error) {
    return { error: 'Error applying for job' }
  }
}
