import { prisma } from "$lib/server/prisma.js";
import type { RequestHandler } from "./$types.js";
import crypto from "crypto";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { articleDetails, buyerId } = body;
    const res = await prisma.orders.create({
        data: {
            name: `Commande_${crypto.randomUUID()}`,
            articleDetails,
            buyerId
        }
    });

    if (!res) {
        return new Response(JSON.stringify({ message: "Commande non enregistrée" }), { status: 500 });
    }
    console.log(res)
    
    return new Response(JSON.stringify({ message: "Commande enregistrée" }), { status: 200 });
}