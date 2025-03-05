"use client";

import { loginRedux } from "@/app/Redux/AuthSlice";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

        if (status === "loading") return;

        if (!user) {
            router.push("/");
        } else if (["/signin", "/signUp", "/"].includes(currentPath)) {
            router.push(`/userProfile/${user.id}`);
        }
    }, [user, status, router]);

    const firstName = user ? user?.firstName : session?.user?.firstName;

    if (!firstName) {
        router.push('/welcome');
    }

    return <>{children}</>;
};

export default ProtectedRoute;
