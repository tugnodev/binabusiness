import { prisma } from '$lib/server/prisma.js';

export interface CreateArticleDto {
    id?: number;
    userId: string;
    titre: string;
    description: string;
    tag: string;
    prix: number;
    stock: number;
    images?: string[];
}

export interface CreateArticle {
    id?: number;
    userId: string;
    titre: string;
    description: string;
    tag: string;
    prix: number;
    stock: number;
    images?: File[];
}

export interface ArticleDto {
    id: number;
    userId: string;
    titre: string;
    description: string;
    tag: string;
    prix: number;
    stock: number;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}

class ArticleRepo {
    async create(data: CreateArticleDto): Promise<ArticleDto> {
        const article: ArticleDto = await prisma.articles.create({
            data: {
                userId: data.userId,
                titre: data.titre,
                description: data.description,
                tag: data.tag,
                prix: data.prix,
                stock: data.stock,
            }
        });

        return article;
    }
    async delete (id: number){
        //delete images
        await prisma.articleImages.deleteMany({
            where: {
                articleId: id,
            }
        });

        const result = await prisma.articles.delete({   
            where: {
                id,
            }
        });
        return result;
    }

    async update (id: number, data: Partial<CreateArticleDto>){
        console.log(data);
        const article: ArticleDto = await prisma.articles.update({
            where: { id },
            data: {
                userId: data.userId,
                titre: data.titre,
                description: data.description,
                tag: data.tag,
                prix: data.prix,
                stock: data.stock
            }
        });
        return article;
    }

    async findById (id: number){
        const article: ArticleDto | null = await prisma.articles.findUnique({
            where: { id },
        });
        return article;
    }

    async findAllByUserId (userId: string){
        const articles: ArticleDto[] = await prisma.articles.findMany({
            where: { userId },
        });
        return articles;
    }
}

export const articleRepo = new ArticleRepo();