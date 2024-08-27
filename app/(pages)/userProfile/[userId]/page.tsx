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

const UserProfile = () => {

  const params = useParams()
  const userId = Number(params?.userId)

  const { data, isPending } = useQuery({
    queryKey: ['getuser', userId],
    queryFn: async () => await getUserById(userId),
  });

  return (
    <div className="min-h-screen w-full flex flex-row items-start gap-5 py-5">
      <div className="w-full md:w-[70%] h-full space-y-5">
        <UserInfo profileUser={data} isLoading={isPending} />
        <AboutMe profileUser={data} isLoading={isPending} />
        <Education userId={userId} />
        <Projects userId={userId} />
        <Experiences userId={userId} />
      </div>
      <div className="hidden md:block md:w-[30%] h-full">
        <MoreProfiles />
      </div>

    </div>
  )
}

export default UserProfile