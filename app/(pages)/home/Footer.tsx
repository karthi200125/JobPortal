import { Button } from "@/components/ui/button"
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import logo from '../../../public/logo.png'

const Footer = () => {

    const footerData = [
        {
            id: 1,
            data: [
                "About Us",
                "carriers",
                "Employee Home",
                "Sit Map",
                "Credits",
            ]
        },
        {
            id: 2,
            data: [
                "Help center",
                "Sommons/Notices",
                "Report Issues",
                "Gravences",
            ]
        },
        {
            id: 3,
            data: [
                "Privacy Policies",
                "Tersm & Conditions",
                "Fraud Alert",
                "Trust & Safty",
            ]
        },
    ]

    return (
        <div className="w-full min-h-[50vh] space-y-5 md:space-y-10 rounded-[20px]">
            
            <div className="flex bg-white flex-col md:flex-row items-center gap-5 justify-between p-5 md:p-10 rounded-[20px] text-black">
                <h2 className="">Find Best Opurtunies Today</h2>
                <div className="flex flex-row items-center gap-5">
                    <Button className='bg-white text-black'>Explore Jobs</Button>
                    <Button className='bg-black'>Start My Journy</Button>
                </div>
            </div>
            <div className="w-full bg-white/[0.05] rounded-[20px] h-full p-5 md:p-10 space-y-5 md:space-y-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    <div className="w-full md:w-[200px] flex flex-col items-center md:items-start justify-center gap-3">
                        <Image src={logo.src} alt="" width={40} height={40} className="object-contain" />
                        <h3 className="font-bold">JOBIFY</h3>
                        <h4 className="text-white/30">We are help you get your dream job</h4>
                    </div>
                    <div className="flex flex-wrap md:flex-row items-start gap-10">
                        {footerData?.map((footer) => (
                            <div key={footer?.id} className="space-y-2">
                                {footer?.data?.map((d) => (
                                    <h4 className="text-white/40 hover:text-white trans cursor-pointer" key={d}>{d}</h4>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-5 w-full border-t-[1px] border-solid border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
                    <h4 className="text-white/30">All Rights Reserved</h4>
                    <div className="flex flex-row items-center gap-3 rounded-full p-3 max-w-max max-h-max bg-white/10">
                        <div className="cursor-pointer hover:opacity-50 trans w-[40px] h-[40px] rounded-full bg-black flexcenter"><FaFacebookF size={15} /></div>
                        <div className="cursor-pointer hover:opacity-50 trans w-[40px] h-[40px] rounded-full bg-black flexcenter"><FaTwitter size={15} /></div>
                        <div className="cursor-pointer hover:opacity-50 trans w-[40px] h-[40px] rounded-full bg-black flexcenter"><FaLinkedinIn size={15} /></div>
                        <div className="cursor-pointer hover:opacity-50 trans w-[40px] h-[40px] rounded-full bg-black flexcenter"><FaFacebookF size={15} /></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer