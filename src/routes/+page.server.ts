import { auth } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if( session?.session ) {
        redirect(303,"/market");
    }
}
