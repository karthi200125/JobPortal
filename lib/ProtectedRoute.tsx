"use client";

import { loginRedux } from "@/app/Redux/AuthSlice";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            dispatch(loginRedux(session.user));
        }
    }, [session, status, dispatch]);

    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (!user && status !== "loading") {
            redirect("/");
        }
        else if (user && ["/signin", "/signUp", "/"].includes(currentPath)) {
            redirect(`/userProfile/${user.id}`);
        }
    }, [user, status, redirect]);

    return null;
};

export default ProtectedRoute;
