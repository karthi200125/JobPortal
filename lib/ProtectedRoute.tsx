"use client";

import { getCompanyByUserId } from "@/actions/company/getCompanyById";
import { loginRedux } from "@/app/Redux/AuthSlice";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

    const { data: company, isPending } = useQuery({
        queryKey: ['getCompanyByUserId', user?.id],
        queryFn: async () => await getCompanyByUserId(user?.id),
        enabled: !!user?.id,
    });

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (status === "loading") return;

        if (!user) {
            router.push("/");
        } else if (["/signin", "/signUp", "/"].includes(currentPath)) {
            router.push(`/userProfile/${user.id}`);
        }
    }, [user, status, router]);

    useEffect(() => {
        if (user?.role === "ORGANIZATION") {
            if (company) {
                router.push(`/userProfile/${user?.id}`);
            } else {
                router.push('/welcome');
            }
        } else if (user && !user.firstName) {
            router.push('/welcome');
        }
    }, [user, company, router]);


    return <>{children}</>;
};

export default ProtectedRoute;
