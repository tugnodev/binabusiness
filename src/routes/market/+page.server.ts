import { prisma } from '$lib/server/prisma.js';
import { auth } from '$lib/server/auth.js';

type frontArticleDto = {
    id: number,
    titre: string,
    prix: number,
    stock: number,
    description: string,
    tag: string[],
    images: string[]
}

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
};

export const load = async ({ request }) => {

    const session = await auth.api.getSession(request);
    if(!session){
        throw new Error("User not found");
    }
    const user = session.user as User;
    if(!user){
        throw new Error("User not found");
    }
    const allArticles = await prisma.articles.findMany();
    const images = await prisma.articleImages.findMany();


    const frontData: frontArticleDto[] = [];

    allArticles.forEach(article => {
        const articleImages = images.filter(image => image.articleId === article.id);
        frontData.push({
            id: article.id,
            titre: article.titre,
            prix: article.prix,
            stock: article.stock,
            description: article.description,
            tag: article.tag.split(" "),
            images: articleImages.map(image => image.image)
        })
    })
    return {
        articles: frontData,
    }
}