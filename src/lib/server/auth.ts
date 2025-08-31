import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private";
import { PrismaClient } from "@prisma/client";
 

const prisma = new PrismaClient();
export const auth = betterAuth({
    appName: "Binabusiness",
    database: prismaAdapter(
        prisma, 
        { provider: "sqlite" }),
    socialProviders: {
        google: {
            prompt: "select_account",
            accessType: "offline",
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        },
    },
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: false,
        maxPasswordLength: 32,
        minPasswordLength: 8,
    },
    plugins:[],
    advanced: {
        cookiePrefix : "binabusiness",
        cookieDomain : "localhost",
        cookieSecure : true,
    }
});

export type Auth = typeof auth;