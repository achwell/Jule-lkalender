import NextAuth, {NextAuthOptions} from "next-auth";
import FacebookProvider from "next-auth/providers/facebook"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
        }),
    ], adapter: PrismaAdapter(prisma)
};
export default NextAuth(authOptions)
