'use server'

import { db } from "@/lib/db";
import { getUserById } from "./auth/getUserById";

type UserRole = 'CANDIDATE' | 'RECRUITER' | 'ORGANIZATION';

export const moreProUsers = async (currentUser: any, profileUserId: any) => {
    if (!profileUserId) return { error: "no Id found" };

    const user: any = await getUserById(profileUserId);

    if (!user) return { error: "user not found" };

    const isCurrentUser = currentUser?.id === profileUserId;
    const userFollowers = user?.followers || [];

    const roleConditions: Record<UserRole, { where: { role: any; id: { not: any; in?: any[]; } } }> = {
        CANDIDATE: {
            where: {
                role: { not: 'ORGANIZATION' },
                id: isCurrentUser ? { not: profileUserId } : { in: userFollowers, not: profileUserId }
            }
        },
        RECRUITER: {
            where: {
                role: { not: 'ORGANIZATION' },
                id: isCurrentUser ? { not: profileUserId } : { in: userFollowers, not: profileUserId }
            }
        },
        ORGANIZATION: {
            where: {
                role: { equals: 'ORGANIZATION' },
                id: isCurrentUser ? { not: profileUserId } : { not: profileUserId }
            },            
        }
    };

    const userRole: UserRole = user?.role;

    const roleCondition = roleConditions[userRole];

    if (!roleCondition) {
        return { error: "Invalid role" };
    }

    const users: any = await db.user.findMany(roleCondition);

    return users;
};
