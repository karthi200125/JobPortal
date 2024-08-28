import { db } from '@/lib/db';

export async function applyForJob(
  userId: number,
  jobId: number,
  candidateEmail: string,
  candidateResume: string,
  candidatePhoneNo: string,
  answers: Record<string, any>
) {
  try {
    await db.jobApplication.create({
      data: {
        userId,
        jobId,
        candidateEmail,
        candidateResume,
        candidatePhoneNo,
        answers,
      },
    });

    console.log('Job applied successfully with additional data.');
  } catch (error) {
    console.error('Error applying for job:', error);
  }
}


// Example usage:
// applyForJob(
//   1, // userId
//   1, // jobId
//   'candidate@example.com', // candidateEmail
//   'https://example.com/resume.pdf', // candidateResume
//   '1234567890', // candidatePhoneNo
//   { question1: "Answer 1", question2: "Answer 2" } // answers in JSON format
// );
