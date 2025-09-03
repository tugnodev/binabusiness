import { auth } from '$lib/server/auth.js'
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js';

export const load = async ({request}: {request: Request}) => {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
        throw redirect(303, '/');
    }
    const commands = await prisma.orders.findMany({
        include: {
            buyer: true,
            seller: true
        }
    })
    return {
        commands
    }  
}