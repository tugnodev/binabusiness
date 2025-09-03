import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';
import { cardService } from '$lib/server/domaine/cardRepo.js';
import type { User } from '@prisma/client';

export const load: ServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect(303, '/');
  }

  const user = session.user as User;
  
  const card = await cardService.fetchCards({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image!,
    vender: false
});

  return { user: session.user, card };
};