import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';
import {prisma} from '$lib/server/prisma.js'

type user = {
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    createdAt: Date,
    updatedAt: Date,
    id: string
}


export const load: ServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        throw redirect(303, '/');
    }else{
        const usersession = session.user as user
        const id = usersession.id;
        const user = await prisma.user.findUnique({
            where: {
                id
            },
        });
        return { user };
    }
};