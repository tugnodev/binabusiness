import { cardService } from '$lib/server/domaine/cardRepo.js'
import { auth } from '$lib/server/auth.js';

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    vender?: boolean;
};

export const GET = async ({ request }) => {
    const session = await auth.api.getSession(request);
    if(!session){
        throw new Error("User not found");
    }
    const user = session.user as User;
    if(!user){
        throw new Error("User not found");
    }
    const res = cardService.fetchCards({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        vender: false
    });
    return new Response(JSON.stringify(res));
}

export const PATCH = async ({ request }) =>{
    const session = await auth.api.getSession(request);
    if(!session){
        throw new Error("User not found");
    }
    const user = session.user as User;
    if(!user){
        throw new Error("User not found");
    }
    const data = await request.json();
    const res = await cardService.patchCard({id: data.id, cardDetails: JSON.parse(data.cardDetails), userId: user.id});
    return new Response(JSON.stringify(res));
}

export const POST = async ({ request }) => {
    const session = await auth.api.getSession(request);
    if(!session){
        throw new Error("User not found");
    }
    const card = await request.json();
    const res = cardService.resetCard(card);
    return new Response(JSON.stringify(res));
}