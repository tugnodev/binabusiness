import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import dotenv from "dotenv";
import {GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private";
import { PrismaClient } from "@prisma/client";
 

dotenv.config();
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(
        prisma, 
        { provider: "postgresql" }),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        },
    },
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: true,
        maxPasswordLength: 256,
        minPasswordLength: 8,
    },
    plugins:[]
});