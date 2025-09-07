import { auth } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';
export const load = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if( session?.session ) {
        redirect(303,"/market");
    }
}

export const actions = {
    signIn : async ({ request, url }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe : true
            },
            headers: request.headers
        });
        if(!res.user){
            return { error: res.user || "An error occurred"};
        }
        throw redirect(308, url+"/market"!);
    },

    signUp : async ({ request, url }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;

        const res = await auth.api.signUpEmail({
            body: {
                email,
                name,
                password,
                callbackURL: url.origin + "/market"
            },
            headers: request.headers
        });
        if(!res.user){
            return { error: res.user || "An error occurred"};
        }
        throw redirect(308, url+"/market"!);
    },

    signInSocial : async ({ request, url }) => {
        const formData = await request.formData();
        const provider = formData.get("provider") as string;

        const res = await auth.api.signInSocial({
            body: {
                provider,
                callbackURL: url.origin + "/market"
            },
            headers: request.headers
        })

        if(!res.url){
            return { error: res || "An error occurred"};
        }
        throw redirect(303, res.url!);
    }
}