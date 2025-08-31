import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js'; 
import type { PageServerLoad } from './$types.js';

type user = {
  name: string,
  email: string,
  emailVerified: boolean,
  image: string | null,
  createdAt: Date,
  updatedAt: Date,
  id: string
}

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw redirect(303, '/');
  }

  const user = session.user as user;
  const id = user.id as string;

  const userArticles = await prisma.articles.findMany({
    where: {
      userId: id
    }
  });

  const userArticleImages = await prisma.articleImages.findMany({
    where: {
      articleId: {
        in: userArticles.map(article => article.id)
      }
    }
  });

  const pageData = {
    userId : id,
    articles: userArticles,
    articleImages: userArticleImages
  };

  return pageData;
};

