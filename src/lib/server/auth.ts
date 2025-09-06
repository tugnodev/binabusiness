import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "$env/dynamic/private";
import pkg from '@prisma/client';
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();
export const auth = betterAuth({
    appName: "Binabusiness",
    database: prismaAdapter(
        prisma, 
        { provider: "sqlite" }),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: env.GOOGLE_ID!,
            clientSecret: env.GOOGLE_SECRET!,
        },
    },
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: false,
        maxPasswordLength: 32,
        minPasswordLength: 8,
    },
    plugins:[sveltekitCookies(getRequestEvent)],
    advanced: {
        cookiePrefix : "binabusiness.vercel.app",
        cookieSecure : true,
    }
});

export type Auth = typeof auth;
