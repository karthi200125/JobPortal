import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { Inter } from "next/font/google";
import "./globals.css";
import Title from "@/lib/MetaTitle";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Title
            title="Find Your Dream Job | JOBIFY"
            description="Browse thousands of job listings from top companies. Apply for jobs and get hired today!"
            keywords="jobs, hiring, careers, job listings, remote jobs"
          />
          <Toaster />
          <ProtectedRoute>{children}</ProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
