'use client'

import { getUserById } from "@/actions/auth/getUserById";
import { loginRedux } from "@/app/Redux/AuthSlice";
import SubscriptionCard from "@/components/SubscriptionCard";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Success = () => {
    const user = useSelector((state: any) => state.user.user)
    const dispatch = useDispatch()
    const pathname = usePathname()

    useEffect(() => {
        const fetchUserData = async () => {
            if (pathname === "/success") {
                const updatedUser = await getUserById(user?.id)
                dispatch(loginRedux(updatedUser))
            }
        };
        fetchUserData();
    }, [dispatch, pathname]);


    return (
        <div className="w-fullpy-5 flexcenter mt-5 md:mt-10">

            <SubscriptionCard />

        </div>
    )
}

export default Success