import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth.js';

export const load: ServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect(303, '/');
  }
  return { user: session.user };
};