import { db } from "@/lib/db";
import { AnyAaaaRecord } from "dns";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string;
            firstName?: string;
            lastName?: string;
            email: string;
            role: string;
            isPro: boolean;
            userBio?: string;
            userAbout?: string;
            userImage?: string;
            profileImage?: string;
            gender?: string;
            address?: string;
            city?: string;
            state?: string;
            country?: string;
            phoneNo?: string;
            postalCode?: string;
            profession?: string;
            website?: string;
            currentCompany?: string;
            resume?: string;
            skills: string[];
            followers: number[];
            followings: number[];
            savedJobs: number[];
            ProfileViews: number[];
            employees: number[];
            verifyEmps: number[];
            createdAt: Date;
            updatedAt: Date;
        };
    }

    interface JWT {
        user: Session["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token }) {
            if (!token.email) return token;

            let user = await db.user.findUnique({
                where: { email: token.email! },
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true,
                    isPro: true,
                    userBio: true,
                    userAbout: true,
                    userImage: true,
                    profileImage: true,
                    gender: true,
                    address: true,
                    city: true,
                    state: true,
                    country: true,
                    phoneNo: true,
                    postalCode: true,
                    profession: true,
                    website: true,
                    currentCompany: true,
                    resume: true,
                    skills: true,
                    followers: true,
                    followings: true,
                    savedJobs: true,
                    ProfileViews: true,
                    employees: true,
                    verifyEmps: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!user) {                
                let role:any = "CANDIDATE"; 
                if (typeof window !== "undefined") {
                    const storedRole = localStorage.getItem("role");
                    if (storedRole) {
                        role = JSON.parse(storedRole);
                    }
                }

                // Create new user
                user = await db.user.create({
                    data: {
                        email: token.email!,
                        username: token.name!,
                        userImage: token.picture!,
                        role,
                    },
                });
            }

            token.user = user;
            return token;
        },

        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as any;
            }
            return session;
        },
    },
};
