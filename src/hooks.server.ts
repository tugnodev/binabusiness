import { auth } from "$lib/server/auth.js";
import { svelteKitHandler } from "better-auth/svelte-kit";

export const handle = svelteKitHandler({ auth });
