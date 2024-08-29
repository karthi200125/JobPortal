'use server'

import { db } from "@/lib/db";
import { getUserById } from "./auth/getUserById";

export const moreProfileUsers = async (currentUserId?: any, userId?: any) => {

    let users;

    if (currentUserId) {
        users = await db.user.findMany({
            where: {
                id: {
                    not: userId
                }
            }
        });
    } else {
        const thisUser = await getUserById(userId);
        const userFollowers = thisUser?.followers || [];

        users = await db.user.findMany({
            where: {
                id: {
                    in: userFollowers
                }
            }
        });
    }

    return users;
}