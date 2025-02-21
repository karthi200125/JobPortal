"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loginRedux } from "@/app/Redux/AuthSlice";
import LpNavbar from "@/components/Navbar/LpNavbar";
import Navbar from "@/components/Navbar/Navbar";

const ProtectedRoute = ({ children }: any) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const blackBg = pathname === '/' || pathname === '/signin' || pathname === '/signUp'

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            dispatch(loginRedux(session.user));
        }
    }, [session, status, dispatch]);

    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (!user && status !== "loading") {
            router.push("/");
        }
        else if (user && ["/signin", "/signUp", "/"].includes(currentPath)) {
            router.push(`/userProfile/${user.id}`);
        }
    }, [user, status, router]);

    return (
        <div className={`w-full min-h-screen ${blackBg ? "bg-black" : "bg-white"} `}>
            <div className={`max-w-[1440px] min-h-screen mx-auto px-2 sm:px-6 md:px-8 lg:px-4 ${blackBg ? "bg-black" : "bg-white"}`}>
                {(pathname !== '/signin' && pathname !== '/signUp') &&
                    (pathname === '/' ? <LpNavbar /> : <Navbar />)
                }
                {children}
            </div>
        </div>
    )
};

export default ProtectedRoute;
