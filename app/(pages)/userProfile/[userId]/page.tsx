'use client'

import { getUserById } from "@/actions/auth/getUserById"
import { useQuery } from '@tanstack/react-query'
import { useParams } from "next/navigation"
import { useEffect } from 'react'
import AboutMe from "../AboutMe"
import CompanySlides from "../CompanySlides/CompanySlides"
import Education from "../Educations"
import Experiences from "../Experiences"
import MoreProfiles from "../MoreProfiles"
import Projects from "../Projects"
import Skills from "../Skills"
import UserInfo from "../UserInfo"
import { updateProfileViews } from "@/actions/user/profileViews"
import { useSelector } from "react-redux"

const UserProfile = () => {
  const user = useSelector((state: any) => state.user.user)
  const params = useParams()
  const userId = Number(params?.userId)

  const { data, isPending } = useQuery({
    queryKey: ['getuser', userId],
    queryFn: async () => await getUserById(userId),
  });
  const company = data?.company[0]
  const isOrg = data?.role === "ORGANIZATION" ? true : false

  useEffect(() => {
    if (user?.id && userId && user?.id !== userId) {
      updateProfileViews(user.id, userId).catch((err) =>
        console.error("Failed to update profile views:", err)
      );
    }
  }, [user?.id, userId]);

  return (
    <div className="min-h-screen w-full flex flex-row items-start gap-5 py-5 px-2">
      <div className="w-full md:w-[70%] h-full space-y-5">
        <UserInfo profileUser={data} isLoading={isPending} company={company} isOrg={isOrg} />

        <AboutMe profileUser={data} isLoading={isPending} company={company} isOrg={isOrg} />
        {!isOrg && <Skills profileUser={data} isLoading={isPending} />}
        {!isOrg && <Education userId={userId} profileUser={data} />}
        {!isOrg && <Projects userId={userId} profileUser={data} />}
        {!isOrg && <Experiences userId={userId} profileUser={data} />}
        {isOrg &&
          <CompanySlides company={company} />
        }
      </div>
      <div className="hidden md:block md:w-[30%] h-full">
        <MoreProfiles userId={userId} />
      </div>

    </div>
  )
}

export default UserProfile