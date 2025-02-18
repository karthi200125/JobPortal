"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loginRedux } from "@/app/Redux/AuthSlice";

const ProtectedRoute = ({ children }: any) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();

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
        <div>
            {children}
        </div>
    )
};

export default ProtectedRoute;
