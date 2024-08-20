'use client'

import Button from "@/components/Button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"

const EasyApplyUserInfo = () => {

    const HandleChnage = (e: any) => {
        console.log(e.target.value)
    }

    const user = {
        email: "skarhtikeyan@gamil.com",
        phoneNo: "7903737636"
    }

    return (
        <div className="w-full space-y-5">

            <div className="space-y-2">
                <h3>Contact Info</h3>
                <div className="w-full border p-5 rounded-md flex flex-row items-start gap-5">
                    <Image src={''} alt="" height={80} width={80} className="rounded-md bg-neutral-200" />
                    <div className="space-y-2">
                        <h4 className="font-bold">karthikeyan</h4>
                        <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, at.</h5>
                        <h5 className="text-[var(--lighttext)]">slame , tamilnadu , india</h5>
                    </div>
                </div>

                <div className="w-full border p-5 rounded-md space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold">Email</h4>
                        <Input
                            value={user?.email}
                            placeholder="Ex: emaple@gamil.com"
                            onChange={HandleChnage}
                            name="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Phone Number</h4>
                        <Input
                            value={user?.phoneNo}
                            name="phoneNo"
                            placeholder="Ex: 123456789"
                            onChange={HandleChnage}
                        />
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default EasyApplyUserInfo