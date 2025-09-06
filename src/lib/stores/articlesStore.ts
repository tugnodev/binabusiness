import type { Articlecart } from '$lib/types/cart.js';
import { writable } from 'svelte/store';

export const articleCart = writable<Articlecart[]>([]);

class ArticleCart {
    
    set(article: Articlecart[]) {
        articleCart.set(article);
    }

    update(newArticle: Articlecart) {
        articleCart.update((articles: Articlecart[]) => {
            const existingItem = articles.find((item) => item.articleId === newArticle.articleId);
            if (existingItem) {
                existingItem.quantity += newArticle.quantity;
            } else {
                articles.push(newArticle);
            }
            return articles;
        });
    }

    clean() {
        articleCart.set([]);
    }
    
}

export const articleCartStore = new ArticleCart();