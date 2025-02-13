'use client'

import LpNavbar from "@/components/Navbar/LpNavbar";
// import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import ProtectedRoute from "@/lib/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const blackBg = pathname === '/' || pathname === '/signin' || pathname === '/signUp'

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <ProtectedRoute />
          <div className={`w-full min-h-screen ${blackBg ? "bg-black" : "bg-white"} `}>
            <div className={`max-w-[1440px] min-h-screen mx-auto px-2 sm:px-6 md:px-8 lg:px-4 ${blackBg ? "bg-black" : "bg-white"}`}>
              {(pathname !== '/signin' && pathname !== '/signUp') &&
                (pathname === '/' ? <LpNavbar /> : <Navbar />)
              }
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
