'use client'

import Button from "@/components/Button"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import noProfile from '@/public/noProfile.webp'
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/actions/auth/getUserById";
import { checkSkills } from "@/actions/job/CompareSkills";

const JobCandidate = ({ userId, job }: any) => {

    const router = useRouter()

    const { data: user, isPending } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => getUserById(userId),
    });

    const { data } = useQuery({
        queryKey: ["getCompareSkills", user, job],
        queryFn: async () => checkSkills(user, job),
    });

    const jobApplication = user?.jobApplications.find((jb: any) => jb.jobId === job.id);

    const handleDownload = () => {
        if (jobApplication?.candidateResume) {
            const link = document.createElement("a");
            link.href = jobApplication.candidateResume;
            link.download = `${user?.username} Resume.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    return (
        <>
            {isPending ?
                "Loading..."
                :
                <div className='w-full p-5 rounded-md border space-y-5'>

                    {/* user info */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Contact Info</h3>
                        <div className="w-full border p-5 rounded-md flex flex-col md:flex-row items-start gap-5">
                            <div className="w-[80px] h-[80px] rounded-md overflow-hidden relative">
                                <Image src={user?.userImage || noProfile.src} alt="" fill className="absolute top-0 left-0 w-full h-full object-cover" />
                            </div>
                            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-5">
                                <div className="space-y-1">
                                    <h4 className="font-bold capitalize">{user?.username}</h4>
                                    <h5 className="text-[var(--lighttext)]">{user?.city},{user?.state},{user?.country}</h5>
                                    <h4 className="max-w-max px-2 py-1 rounded-md bg-green-100 text-green-600 text-xs font-semibold">Skills Match : {data?.per}%</h4>
                                    <h4>Exp : Frehser</h4>
                                    <h4>{jobApplication?.candidateMobile}</h4>
                                </div>
                                <Button variant="border" onClick={() => router.push(`/userProfile/${user?.id}`)} icon={<IoPersonOutline size={18} />}>View Profile</Button>
                            </div>
                        </div>

                    </div>

                    {/* resume */}
                    <div className='space-y-2'>
                        <h3 className="font-semibold text-sm">Resume</h3>
                        <div className='border rounded-md p-5 flex flex-row items-center justify-between'>
                            <h4>Resume</h4>
                            {jobApplication?.candidateResume && (
                                <Button variant="border" onClick={handleDownload}>Download</Button>
                            )}
                        </div>
                    </div>

                    {/*Additional Questions */}
                    <div className='space-y-2'>
                        <h3 className="font-semibold text-sm">Additional Questions</h3>
                        <div className='space-y-2 border rounded-md p-5'>
                            {jobApplication?.questionAndAnswers && jobApplication?.questionAndAnswers?.map((qa: any) => (
                                <div key={qa?.id}>
                                    <h6 className='text-[var(--lighttext)]'>{qa?.question}</h6>
                                    <h4>{qa?.answer}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default JobCandidate