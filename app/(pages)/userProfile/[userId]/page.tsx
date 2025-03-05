'use client'

import { getUserById } from "@/actions/auth/getUserById"
import { updateProfileViews } from "@/actions/user/profileViews"
import Title from "@/lib/MetaTitle"
import { useQuery } from '@tanstack/react-query'
import { useParams } from "next/navigation"
import { useEffect, useMemo } from 'react'
import { useSelector } from "react-redux"
import AboutMe from "../AboutMe"
import CompanySlides from "../CompanySlides/CompanySlides"
import Education from "../Educations"
import Experiences from "../Experiences"
import MoreProfiles from "../MoreProfiles"
import Projects from "../Projects"
import UserInfo from "../UserInfo"

const UserProfile = () => {
  const user = useSelector((state: any) => state.user.user)
  const params = useParams()

  const userId = useMemo(() => Number(params?.userId), [params?.userId])

  const { data, isPending } = useQuery({
    queryKey: ['getuser', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,  
  });

  const company = useMemo(() => data?.company?.[0], [data?.company])
  const isOrg = useMemo(() => data?.role === "ORGANIZATION", [data?.role])

  useEffect(() => {
    if (user?.id && userId && user?.id !== userId) {
      updateProfileViews(user.id, userId).catch((err) =>
        console.error("Failed to update profile views:", err)
      );
    }
  }, [user?.id, userId]);

  return (
    <div className="min-h-screen w-full flex flex-row items-start gap-5 py-5">
      <Title
        title={`${data?.username || "User Profile"} | JOBIFY`}
        description="View user profiles, explore professional details, and connect with job seekers and recruiters on JOBIFY."
        keywords="user profile, job seeker profile, recruiter profile, jobify network"
      />

      <div className="w-full md:w-[70%] h-full space-y-5">
        <UserInfo profileUser={data} isLoading={isPending} company={company} isOrg={isOrg} />
        <AboutMe profileUser={data} isLoading={isPending} company={company} isOrg={isOrg} />

        {!isOrg && (
          <>
            <Education userId={userId} profileUser={data} />
            <Projects userId={userId} profileUser={data} />
            <Experiences userId={userId} profileUser={data} />
          </>
        )}

        {isOrg && <CompanySlides company={company} profileUser={data} />}
      </div>

      <div className="hidden md:block md:w-[30%] h-full">
        <MoreProfiles userId={userId} />
      </div>
    </div>
  )
}

export default UserProfile
