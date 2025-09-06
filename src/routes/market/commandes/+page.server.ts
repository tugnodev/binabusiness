import { auth } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';
import type { User } from 'better-auth';



export const load = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        throw redirect(303, '/');
    }

    const user = session.user as User;

    const orders = await prisma.orders.findMany({
        where: {
            buyerId: user.id
        }
    });
    return {
        user,
        orders
    }
}