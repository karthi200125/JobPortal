import Image from "next/image";
import apple from "../../../public/apple.jpg";
import netflix from "../../../public/netflix.png";
import nvidia from "../../../public/nvidia.png";
import Marquee from "react-fast-marquee";

const LpAbout = () => {
    const AboutWhatWeDid = [
        {
            id: 1,
            percentage: "91%",
            title: "Skills Aligned",
            desc: "Many job seekers match their skills to the right jobs",
        },
        {
            id: 2,
            percentage: "90%",
            title: "Fast And Efficient",
            desc: "Company data filtering is quick and efficient",
        },
        {
            id: 3,
            percentage: "89%",
            title: "Wide Range",
            desc: "Top employers interacting with many job seekers",
        },
    ];

    const images = [
        netflix,
        nvidia,
        apple,
        netflix,
        nvidia,
        apple,
        netflix,
        nvidia,
        apple,
        netflix,
        nvidia,
        apple,
    ]

    return (
        <div className="w-full max-h-max py-10 lg:py-20 flex flex-col justify-center items-center gap-10 lg:gap-20">
            {/* Image Marquee */}
            <Marquee
                speed={50}
                gradient={true}
                pauseOnHover
                gradientWidth={100}
                gradientColor="black"
                className="w-full md:!w-[85%] h-[100px] lg:h-[200px]"
            >
                <div className="flex flex-row items-center gap-32 px-10">
                    {images.map((img, index) => (
                        <Image key={index} src={img} alt="Company Logo" width={100} height={50} className="object-contain" />
                    ))}
                </div>
            </Marquee>


            {/* Stats Section */}
            <div className="w-full lg:w-[85%] p-10 rounded-[30px] flex flex-col md:flex-row items-center justify-between bg-white/[0.05] gap-10">
                {AboutWhatWeDid.map((about) => (
                    <div key={about.id} className="text-center w-full md:w-[200px] space-y-2">
                        <h2>{about.percentage}</h2>
                        <h3 className="text-neutral-600">{about.title}</h3>
                        <h5 className="text-white/20">{about.desc}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LpAbout;
