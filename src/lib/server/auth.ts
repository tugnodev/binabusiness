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
    secret: env.BETTER_AUTH_SECRET!,
    baseURL: env.ENV === "prod" ? "https://binabusiness.vercel.app" : "http://localhost:5173",
    origin: env.ENV === "prod" ? "https://binabusiness.vercel.app" : "http://localhost:5173",
    trustedOrigins: [
        "http://localhost:5173",
        "http://192.168.1.16:5173",
        "https://binabusiness.vercel.app",
    ],
    cookies: {
        secure: true,
        sameSite: "strict",
        httpOnly: true
    },
    database: prismaAdapter(
        prisma, 
        { provider: "sqlite" }
    ),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: env.GOOGLE_ID!,
            clientSecret: env.GOOGLE_SECRET!,
            callbackURL: env.ENV === "prod" ? "https://binabusiness.vercel.app/api/auth/callback/google" : "http://localhost:5173/api/auth/callback/google",
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
