import NextAuth, {NextAuthOptions} from "next-auth";
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';
import {Provider} from "next-auth/providers";
import {JWT} from "next-auth/jwt";
import {Session} from "next-auth/core/types";

const prisma = new PrismaClient();

const {APPLE_ID, APPLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env

function getProviders() {
    const providers: Provider[] = []
    if (FACEBOOK_ID && FACEBOOK_SECRET) {
        providers.push(FacebookProvider({
            clientId: FACEBOOK_ID,
            clientSecret: FACEBOOK_SECRET,
        }))
    }
    if (APPLE_ID && APPLE_SECRET) {
        providers.push(AppleProvider({
            clientId: APPLE_ID,
            clientSecret: APPLE_SECRET,
        }))
    }
    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
        providers.push(GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }))
    }
    return providers;
}

export const authOptions: NextAuthOptions = {
    providers: getProviders(),
    adapter: PrismaAdapter(prisma),
    events: {
        async signOut() {
            console.log("signOut")
        }
    }
};
export default NextAuth(authOptions)
