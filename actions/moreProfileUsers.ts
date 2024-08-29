'use server'

import { db } from "@/lib/db";
import { getUserById } from "./auth/getUserById";

export const moreProfileUsers = async (id?: any, currentUser?: any, CuId?: any) => {
    let users;

    if (currentUser) {
        users = await db.user.findMany({
            where: {
                id: {
                    not: id
                }
            }
        });
    } else {
        const thisUser = await getUserById(id);
        const userFollowers = thisUser?.followers || [];

        users = await db.user.findMany({
            where: {
                id: {
                    in: userFollowers,
                    not: CuId
                }
            }
        });
    }

    return users;
}