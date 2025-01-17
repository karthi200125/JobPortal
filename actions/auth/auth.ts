// import { db } from '@/lib/db';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import NextAuth from 'next-auth';
// import { getUserById } from './getUserById';
// import { options } from '@/app/api/auth/[...nextauth]/options';

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     callbacks: {
//         async signIn({ user, account }) {
//             try {
//                 if (account?.provider !== 'credentials') return true;

//                 if (!user.id) {
//                     console.error('User ID is missing in signIn callback.');
//                     return false;
//                 }

//                 const existingUser = await getUserById(user.id);
                
//                 if (!existingUser?.emailVerified) {
//                     console.error(`User with ID ${user.id} has not verified their email.`);
//                     return false;
//                 }
//                 return true;
//             } catch (error) {
//                 console.error('Error in signIn callback:', error);
//                 return false;
//             }
//         },
//         async session({ session, token }) {
//             try {
//                 if (!token.sub) return session;

//                 const existingUser = await db.user.findUnique({
//                     where: { id: token.sub },
//                     select: {
//                         id: true,
//                         username: true,
//                         email: true,
//                         userImage: true,
//                         role: true,
//                         gender: true,
//                         address: true,
//                         city: true,
//                         state: true,
//                         phoneNo: true,
//                         postalCode: true,
//                         isPro: true,
//                         skills: true,
//                     },
//                 });

//                 if (existingUser) {
//                     session.user = {
//                         id: existingUser.id,
//                         username: existingUser.username ?? '',
//                         email: existingUser.email ?? '',
//                         image: existingUser.userImage ?? null,
//                         role: existingUser.role,
//                         gender: existingUser.gender ?? null,
//                         address: existingUser.address ?? null,
//                         city: existingUser.city ?? null,
//                         state: existingUser.state ?? null,
//                         phoneNo: existingUser.phoneNo ?? null,
//                         postalCode: existingUser.postalCode ?? null,
//                         isPro: existingUser.isPro ?? false,
//                         skills: existingUser.skills ?? [],
//                     };
//                 }

//                 return session;
//             } catch (error) {
//                 console.error('Error in session callback:', error);
//                 return session;
//             }
//         },
//         async jwt({ token }) {
//             try {
//                 if (!token.sub) return token;

//                 const existingUser = await getUserById(token.sub);

//                 if (existingUser) {
//                     token.isAdmin = existingUser.role === 'ADMIN';
//                 }

//                 return token;
//             } catch (error) {
//                 console.error('Error in JWT callback:', error);
//                 return token;
//             }
//         },
//     },
//     adapter: PrismaAdapter(db),
//     session: { strategy: 'jwt' },
//     ...options,
// });
