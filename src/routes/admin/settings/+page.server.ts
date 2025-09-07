import { auth } from "$lib/server/auth.js";
import type { User } from "better-auth";
import type { PageServerLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
//import { prisma } from "$lib/server/prisma.js";


export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        throw redirect(303, '/');
    }

    const user = session.user as User;
    const card = {
        name: user.name,
        email: user.email,
        image: user.image,
        id: user.id
    }

    return {
        card
    };
}

export const actions = {
    logout: async ({ request }) => {
        const res = await auth.api.signOut({ headers: request.headers });
        console.log(res);
        if(res.success){
            throw redirect(303, '/');
        }
    }
}