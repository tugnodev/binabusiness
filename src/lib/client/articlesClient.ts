import { authClient } from "./auth.client.js";



export const eventBus = new EventTarget();

export type createArticleDto = {
    id?: number,
    userId: string
    titre: string,
    images: string[]
    tag: string,
    description: string,
    prix: number,
    stock: number,
}

export type articleImagesDto = {
    id?: number,
    articleId?: number,
    image: string
}

export type articleDto = {
    id: number,
    userId: string,
    titre: string,
    prix: number,
    stock: number,
    description: string,
    tag: string,
    createdAt: Date,
    updatedAt: Date
}

class ArticlesClient {
    private sesssion;

    constructor() {
        this.sesssion = authClient.getSession();
    }

    create = async ( article: createArticleDto ) => {
        const formData = new FormData();
        formData.append('titre', article.titre);
        formData.append('prix', article.prix.toString());
        formData.append('stock', article.stock.toString());
        formData.append('description', article.description);
        formData.append('tag', this.handleCate(article.tag));
        formData.append('images', this.handleImages(article.images));
        formData.append('userId', article.userId);

        const response = await fetch("/api/uploads/article", {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        console.log(data);

        if(response.status === 201){
            return new Response(JSON.stringify(data), { status: 201 });
        }else{
            return new Response(JSON.stringify(data), { status: response.status });
        }
    }

    private handleCate = (cate: string) => {
        return cate.split(' ').join('+');
    }
    private handleImages = (images: string[]) : string => {
        return JSON.stringify(images);
    }
}

export const articlesClient = new ArticlesClient();