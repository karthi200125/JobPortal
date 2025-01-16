'use server'

import { db } from "@/lib/db";
import { getUserById } from "./auth/getUserById";

export const moreProUsers = async (currentUser: any, profileUserId: any) => {
    let users: any;

    if (!profileUserId) return { error: "no Id found" }

    const user: any = getUserById(profileUserId)

    if (!user) return { error: "user not found" }

    const isCan = user?.role === "CANDIDATE"
    const isOrg = user?.role === "ORGANIZATION"
    const isRec = user?.role === "RECRUITER"

    const userFollowers = user?.followers || [];
    const isCurrentUser = currentUser?.id === profileUserId

    if (isCan) {
        if (isCurrentUser) {
            users = await db.user.findMany({
                where: {
                    id: {
                        not: profileUserId
                    }
                }
            });
        } else {
            users = await db.user.findMany({
                where: {
                    id: {
                        in: userFollowers,
                        not: profileUserId
                    }
                }
            });
        }
    }

    if (isRec) {
        if (isCurrentUser) {
            users = await db.user.findMany({
                where: {
                    id: {
                        not: profileUserId
                    }
                }
            });
        } else {
            users = await db.user.findMany({
                where: {
                    id: {
                        in: userFollowers,
                        not: profileUserId
                    }
                }
            });
        }
    }

    if (isOrg) {
        if (isCurrentUser) {
            users = await db.user.findMany({
                where: {
                    id: {
                        not: profileUserId,
                    },
                    role: {
                        equals: "ORGANIZATION",
                    }
                }
            });
        } else {
            users = await db.user.findMany({
                where: {
                    id: {
                        in: userFollowers,
                        not: profileUserId
                    },
                    role: {
                        equals: "ORGANIZATION",
                    }
                }
            });
        }
    }

    return users;
}

