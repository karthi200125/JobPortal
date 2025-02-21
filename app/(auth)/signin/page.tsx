'use client'

import { GoArrowLeft } from "react-icons/go";
import AuthLeftSide from "../AuthLeftSide"
import SigninRightSide from "./SignInRightSide"
import Link from "next/link";
import Title from "@/lib/MetaTitle";

const LoginPage = () => {
  return (
    <main className="w-full min-h-screen sm:h-screen flex flex-row items-center bg-[var(--black)]">
      <Title
        title="Find Your Dream Job | JOBIFY"
        description="Browse thousands of job listings from top companies. Apply for jobs and get hired today!"
        keywords="jobs, hiring, careers, job listings, remote jobs"
      />
      <div className="hidden w-full lg:w-[40%] h-full lg:flex items-center justify-center">
        <AuthLeftSide />
      </div>
      <div className="pt-[100px] md:pt-[0] relative w-full lg:w-[60%] h-full flex items-center justify-center bg-white/10 overflow-y-scroll md:overflow-hidden">
        <SigninRightSide />
        <Link href={'/'} className="text-sm absolute hover:bg-white/10 cursor-pointer top-5 left-5 border-[1px] border-solid border-white/40 py-2 px-3 rounded-md text-white flex flex-row items-center gap-3">
          <GoArrowLeft size={20} />
          Home
        </Link>
      </div>
    </main>
  )
}

export default LoginPage