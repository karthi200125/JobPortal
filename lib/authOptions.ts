import { db } from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { parseCookies } from "nookies";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                // const cookies = parseCookies();
                // const selectedRole = cookies.user_role; 
                const selectedRole = 'CANDIDATE'

                if (!selectedRole) {
                    console.error("Role not found in cookies.");
                    return false;
                }

                let existingUser = await db.user.findUnique({
                    where: { email: user.email! },
                });

                if (!existingUser) {
                    existingUser = await db.user.create({
                        data: {
                            email: user.email!,
                            username: user.name!,
                            userImage: user.image!,
                            role: selectedRole,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            }
        },

        async jwt({ token }) {
            const existingUser = await db.user.findUnique({
                where: { email: token.email! },
            });

            if (existingUser) {
                token.id = existingUser.id;
                token.role = existingUser.role;
            }

            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            };
        }
    }
};
