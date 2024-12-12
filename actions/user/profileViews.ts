import { db } from "@/lib/db"

export const ProfileViews = async (currentUserId?: any, userId?: any) => {
    try {
        // await db.user.update({
        //     where: {
        //         id: userId, 
        //     },
        //     data: {
        //         profileViews: {
        //             push: currentUserId, 
        //         },
        //     },
        // });
        // return;
    } catch (error) {
        console.log(error);
    }
}
