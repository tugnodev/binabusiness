import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js';
import type { User } from '@prisma/client';

class State {
  async totalArticle () {
    const total = await prisma.articles.count({
      where: {
        stock: {
          gt: 0
        }
      }
    });
    return total;
  }
  async outOfStock () {
    const result = await prisma.articles.count({
      where: {
        stock: {
          lte: 0
        }
      }
    })
    return result;
  }

  async totalCommands () {
    const result = await prisma.orders.count({
      where: {
        orderStatus: "commande en cours"
      }
    })
    return result;
  }

  async totalSell(){
    const result = await prisma.orders.count({
      where: {
        orderStatus: "commande valide"
      }
    })
    return result;
  }
  async getStates(){
    const data = {
      av : await this.totalArticle(),
      ar : await this.outOfStock(),
      ac : await this.totalCommands(),
      as : await this.totalSell()
    }
    return data;
  }
}

const state = new State();

export const load: ServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect(303, '/');
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  }) as User;
  if (!user.vender) {
    throw redirect(303, '/');
  }

  const states = await state.getStates();

  return { user: session.user, states };
};
