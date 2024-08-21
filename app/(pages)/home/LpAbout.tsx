
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
            <div className="w-[85%] flex flex-row items-center justify-between">
                {AboutWhatWeDid?.map((about) => (
                    <div key={about?.id} className="text-center w-[200px]">
                        <h2>{about.percentage}</h2>
                        <h3>{about?.title}</h3>
                        <h5 className="text-white/40">{about?.desc}</h5>
                    </div>
                ))}
            </div>

            <div className="bg-white/10 rounded-[20px] w-[85%] h-[500px]">

            </div>

        </div>
    )
}

export default LpAbout