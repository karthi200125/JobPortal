'use client'

import Button from "@/components/Button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"
import noProfile from '../../../../../public/noProfile.webp'

interface EasyApplyUserInfoProps {
    onUserdata?: (value: { email: string, phone: string }) => void,
    onNext?: (value: number) => void,
    currentStep?: number
}

const EasyApplyUserInfo = ({ onUserdata, onNext, currentStep = 0 }: EasyApplyUserInfoProps) => {
    const user = useSelector((state: any) => state.user.user)

    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phoneNo || "")

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (onUserdata) {
            onUserdata({ email, phone })
        }
        if (onNext) {
            onNext(currentStep + 1)
        }
        console.log(email, phone)
    }

    return (
        <div className="w-full space-y-5">
            <div className="space-y-2">
                <h3>Contact Info</h3>
                <div className="w-full border p-5 rounded-md flex flex-row items-start gap-5">
                    <Image src={user?.userImage || noProfile.src} alt="User Image" height={80} width={80} className="rounded-md bg-neutral-200" />
                    <div className="space-y-2">
                        <h4 className="font-bold">{user?.username}</h4>
                        <h5>{user?.userBio}</h5>
                        <h5 className="text-[var(--lighttext)]">{user?.city}, {user?.state}, {user?.country}</h5>
                    </div>
                </div>

                <form className="w-full border p-5 rounded-md space-y-4" onSubmit={handleNext}>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Email</h4>
                        <Input
                            value={email}
                            placeholder="Ex: example@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Phone Number</h4>
                        <Input
                            value={phone}
                            name="phoneNo"
                            placeholder="Ex: 123456789"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <Button >Next</Button>
                </form>
            </div>
        </div>
    )
}

export default EasyApplyUserInfo
