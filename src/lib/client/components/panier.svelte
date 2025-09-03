<script module>
    export type Articlecart = {
        articleId: number;
        articleName: string;
        articleImage: string;
        articlePrice: number;
        quantity: number;
    };
</script>

<script lang="ts">
    import { fly } from "svelte/transition";
    import { articleCart, articleCartStore } from "$lib/stores/articlesStore.js";
    import { userStore } from '$lib/stores/user.js';

    const resetCart = async () => {
        articleCart.set([]);
        await fetch('/market/cards', {
            method: 'POST',
            body: JSON.stringify({
                id: $userStore?.cardID,
                userId: $userStore?.id,
                cardDetails: JSON.stringify([])
            })
        });
    }

    const deleteArticle = async (articleId: number) => {
        articleCart.update(cart => cart.filter(a => a.articleId !== articleId));

        await fetch('/market/cards', {
            method: 'PATCH',
            body: JSON.stringify({
                id: $userStore?.cardID,
                cardDetails: JSON.stringify($articleCart)
            })
        });
    }

    
</script>

<div in:fly={{ x: 700 }} out:fly={{ x: 700 }} class="w-96 rounded-2xl border-2 gap-2 border-base-200 fixed z-20 top-16 p-4 right-0 flex flex-col justify-between items-center max-h-96 transition-all duration-300 bg-base-200/60 shadow-lg backdrop-blur-sm">
    <div class="flex justify-between items-center w-full h-full">
        <h1 class="text-lg font-Raleway font-extrabold">MON PANIER</h1>
        <button onclick={() => resetCart()} class="btn btn-error btn-sm rounded-full">Vider</button>
    </div>
    <div class="flex flex-col gap-2 overflow-y-auto no-scrollbar justify-start items-center w-full h-full">
        {#each $articleCart as article}
            <div class="flex p-2 items-center gap-2 w-full bg-base-200/60 rounded-2xl border-2 border-base-200 hover:bg-primary/40 shadow-sm transition-all duration-300">
                <img src={article.articleImage} alt={article.articleName} class="rounded-full border-4 border-base-200 w-14 h-14">
                <div class="flex gap-2 justify-between w-full">
                    <div class="flex flex-col">
                        <h2 class="font-Raleway text-lg font-bold">{article.articleName}</h2>
                        <h2 class="font-Raleway text-sm font-bold">{article.articlePrice} XOF</h2>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex h-full items-center gap-2">
                            <button onclick={() => {article.quantity--; if(article.quantity < 1) article.quantity = 1}} class="btn btn-xs btn-primary">-</button>
                            <h2 class="font-Raleway text-sm font-bold">{article.quantity}</h2>
                            <button onclick={() => article.quantity++} class="btn btn-xs btn-primary">+</button>
                        </div>
                        <button onclick={() => deleteArticle(article.articleId)} class="btn btn-xs btn-error">Supprimer</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="flex flex-col justify-between items-center w-full h-full">
        <div class="flex justify-between text-lg font-Raleway font-bold border-base-200 items-center w-full h-full">
            <h2>Total : </h2>
            <h2>{$articleCart.reduce((total, article) => total + article.articlePrice * article.quantity, 0)} XOF</h2>
        </div>
        <button class="btn btn-primary btn-sm rounded-full">Commander</button>
    </div>
</div>
