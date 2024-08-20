'use client'

import Button from "@/components/Button"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

const JobCandidate = () => {

    const router = useRouter()

    return (
        <div className='w-full p-5 rounded-md border space-y-5'>

            {/* user info */}
            <div className="space-y-2">
                <h3 className="font-semibold text-sm">Contact Info</h3>
                <div className="w-full border p-5 rounded-md flex flex-row items-start gap-5">
                    <Image src={''} alt="" height={90} width={90} className="rounded-md bg-neutral-200" />
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className="space-y-1">
                            <h4 className="font-bold">karthikeyan</h4>
                            <h4>test@gamil.com</h4>
                            <h5 className="text-[var(--lighttext)]">slame , tamilnadu , india</h5>
                            <h4>123456890</h4>
                        </div>
                        <Button variant="border" onClick={() => router.push('/userProfile')} icon={<IoPersonOutline size={18} />}>View Profile</Button>
                    </div>
                </div>

            </div>

            {/* resume */}
            <div className='space-y-2'>
                <h3 className="font-semibold text-sm">Resume</h3>
                <div className='border rounded-md p-5 flex flex-row items-center justify-between'>
                    resume name
                    <Button variant="border">View</Button>
                </div>
            </div>

            {/*Additional Questions */}
            <div className='space-y-2'>
                <h3 className="font-semibold text-sm">Additional Questions</h3>
                <div className='space-y-2 border rounded-md p-5'>
                    <div>
                        <h6 className='text-[var(--lighttext)]'>Have you completed the following level of education: Bachelor's Degree?</h6>
                        <h4>Yes</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobCandidate