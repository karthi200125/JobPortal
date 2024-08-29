'use client'

import AboutMe from "../AboutMe"
import Education from "../Educations"
import MoreProfiles from "../MoreProfiles"
import Projects from "../Projects"
import UserInfo from "../UserInfo"
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { getUserById } from "@/actions/auth/getUserById"
import Experiences from "../Experiences"
import Skills from "../Skills"
import { getCompanyById, getCompanyByUserId } from "@/actions/company/getCompanyById"
import CompanySlides from "../CompanySlides/CompanySlides"

const UserProfile = () => {

  const params = useParams()
  const userId = Number(params?.userId)

  const { data, isPending } = useQuery({
    queryKey: ['getuser', userId],
    queryFn: async () => await getUserById(userId),
  });

  const isOrg = data?.role === "ORGANIZATION" ? true : false

  const { data: company, isPending: companyLoading } = useQuery({
    queryKey: ['getCompany', userId],
    queryFn: async () => await getCompanyByUserId(userId),
  });

  return (
    <div className="min-h-screen w-full flex flex-row items-start gap-5 py-5">
      <div className="w-full md:w-[70%] h-full space-y-5">
        <UserInfo profileUser={data} isLoading={isPending || companyLoading} company={company} isOrg={isOrg} />

        {/* <AboutMe profileUser={data} isLoading={isPending || companyLoading} company={company} isOrg={isOrg} /> */}
        {/* {!isOrg && <Skills profileUser={data} isLoading={isPending || companyLoading} />}
        {!isOrg && <Education userId={userId} profileUser={data} />}
        {!isOrg && <Projects userId={userId} profileUser={data} />}
        {!isOrg && <Experiences userId={userId} profileUser={data} />} */}
        {isOrg &&
          <CompanySlides />
        }
      </div>
      <div className="hidden md:block md:w-[30%] h-full">
        {/* <MoreProfiles profileUser={data} userId={userId} /> */}
      </div>

    </div>
  )
}

export default UserProfile