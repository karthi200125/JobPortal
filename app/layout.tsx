'use client'

import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { Inter } from "next/font/google";
import "./globals.css";
import Title from "@/lib/MetaTitle";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import LpNavbar from "@/components/Navbar/LpNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const pathname = usePathname();
  const blackBg = pathname === '/' || pathname === '/signin' || pathname === '/signUp'

  return (
    <html lang="en">
      <body className={inter.className}>
        <Title
          title="Find Your Dream Job | JOBIFY"
          description="Browse thousands of job listings from top companies. Apply for jobs and get hired today!"
          keywords="jobs, hiring, careers, job listings, remote jobs"
        />
        <Providers>
          <div className={`w-full min-h-screen ${blackBg ? "bg-black" : "bg-white"} `}>
            <div className={`max-w-[1440px] min-h-screen mx-auto px-2 sm:px-6 md:px-8 lg:px-4 ${blackBg ? "bg-black" : "bg-white"}`}>
              {(pathname !== '/signin' && pathname !== '/signUp') &&
                (pathname === '/' ? <LpNavbar /> : <Navbar />)
              }

              <Toaster />
              <ProtectedRoute>{children}</ProtectedRoute>
            </div>
          </div>
        </Providers>
      </body>
    </html >
  );
}
