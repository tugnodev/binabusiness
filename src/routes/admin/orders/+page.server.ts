import { auth } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';
import type { User } from 'better-auth';
import type { Actions } from './$types.js';



export const load = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        throw redirect(303, '/');
    }

    const user = session.user as User;

    const orders = await prisma.orders.findMany();
    orders.map( async (order) => {
        order.articleDetails = JSON.parse(order.articleDetails);
        const buyerName = await prisma.user.findUnique({ where: { id: order.buyerId }, select: { name: true } });
        order.buyerId = buyerName!.name!;
    });
    return {
        user,
        orders
    }
}

export const actions : Actions = {
    validateOrder: async ({ request }) => {
        const formData = await request.formData();
        const orderId = Number(formData.get('orderId'));
        const order = await prisma.orders.findUnique({ where: { id: orderId } });
        if (!order) {
            return { error: 'Order not found' };
        }
        order.orderStatus = 'expedier';
        await prisma.orders.update({ where: { id: orderId }, data: order });
        return { success: 'Order validated' };
    }
}
