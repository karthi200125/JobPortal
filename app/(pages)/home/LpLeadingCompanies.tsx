'use client'

import Image from 'next/image'
import nvidia from '../../../public/nvidia.png'
import apple from '../../../public/apple.jpg'
import netflix from '../../../public/netflix.png'


const LpLeadingCompanies = () => {
    return (
        <div className="w-full space-y-20">
            <div className="w-full flex flex-row items-center justify-between">
                <span className="w-[30%] h-[1px] bg-white/20"></span>
                <h2 className="uppercase">trusted by the Leading companies</h2>
                <span className="w-[30%] h-[1px] bg-white/20"></span>
            </div>

            <div className="w-[85%] mx-auto bg-white/[0.05] px-10 rounded-[20px] h-[100px] flex flex-row items-center justify-between">
                <Image src={netflix?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={nvidia?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={apple?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={netflix?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={nvidia?.src} alt='' width={100} height={50} className='object-contain' />
            </div>

            <div className="space-y-20 w-[85%] mx-auto">
                <div className="flex flex-row items-center gap-5">
                    <h1 className="flex-1">We Help You Get Your Dream Job</h1>
                    <h5 className="flex-1 text-white/40">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, iusto numquam voluptates, aperiam eum consequuntur quia, laborum vero velit labore sunt odit sequi ullam ea quos. Recusandae quas unde reiciendis?</h5>
                </div>
                <div className="flex flex-row items-center gap-10">
                    <div className="flex-1 rounded-[30px] p-10 bg-white/10 max-h-max space-y-5">
                        <div className="w-[60px] h-[60px] bg-black rounded-full"></div>
                        <h4>FLEXIBILITY</h4>
                        <h2>Discover the 2000 most flexible companies in the world</h2>
                        <div className="flex flex-row items-center gap-5">
                            <span className="w-[20%] h-[1px] bg-white"></span>
                            <h6>Learn More..</h6>
                        </div>
                    </div>
                    <div className="flex-1 rounded-[30px] p-10 bg-white/10 max-h-max space-y-5">
                        <div className="w-[60px] h-[60px] bg-black rounded-full"></div>
                        <h4>FLEXIBILITY</h4>
                        <h2>Discover the 2000 most flexible companies in the world</h2>
                        <div className="flex flex-row items-center gap-5">
                            <span className="w-[20%] h-[1px] bg-white"></span>
                            <h6>Learn More..</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LpLeadingCompanies