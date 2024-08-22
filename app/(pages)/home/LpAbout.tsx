import Image from "next/image"
import nvidia from '../../../public/nvidia.png'
import apple from '../../../public/apple.jpg'
import netflix from '../../../public/netflix.png'


const LpAbout = () => {

    const AboutWhatWeDid = [
        {
            id: 1,
            percentage: "91%",
            title: "Skills Aligned",
            desc: "Many job seekers match their skills to right jobs"
        },
        {
            id: 2,
            percentage: "90%",
            title: "Fast And Efficient",
            desc: "Compnay data filtering quick and efficneinet"
        },
        {
            id: 3,
            percentage: "89%",
            title: "Wide Range",
            desc: "Top e,mployers interacting with manu job seekers"
        },
    ]

    return (
        <div className="w-full max-h-max py-20 flex flex-col justify-center items-center gap-20">

            <div className="w-full flex flex-row items-center justify-between">
                <span className="w-[30%] h-[1px] bg-white/20"></span>
                <h2 className="uppercase">trusted by the Leading companies</h2>
                <span className="w-[30%] h-[1px] bg-white/20"></span>
            </div>

            <div className="w-[85%] mx-auto px-10 rounded-[20px] h-[100px] flex flex-row items-center justify-between">
                <Image src={netflix?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={nvidia?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={apple?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={netflix?.src} alt='' width={100} height={50} className='object-contain' />
                <Image src={nvidia?.src} alt='' width={100} height={50} className='object-contain' />
            </div>

            <div className="bg-white/10 rounded-[20px] w-[85%] h-[500px]">

            </div>


            <div className="w-[85%] p-10 rounded-[30px] flex flex-row items-center justify-between bg-white/[0.05]">
                {AboutWhatWeDid?.map((about) => (
                    <div key={about?.id} className="text-center w-[200px]">
                        <h2>{about.percentage}</h2>
                        <h3>{about?.title}</h3>
                        <h5 className="text-white/40">{about?.desc}</h5>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default LpAbout