<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { articleCart, articleCartStore } from "$lib/stores/articlesStore.js";
    import { userStore } from '$lib/stores/user.js';
    import OrderModal from "./orderModal.svelte";
    import { eventBus } from "../articlesClient.js";
    import { get } from 'svelte/store';

    let orderModal = $state(false);

    const resetCart = async () => {
        articleCart.set([]);
        const user = get(userStore);
        await fetch('/market/cards', {
            method: 'POST',
            body: JSON.stringify({
                id: user?.cardID,
                userId: user?.id,
                cardDetails: JSON.stringify([])
            })
        });
        eventBus.dispatchEvent(new CustomEvent('resetCart'));
    }

    eventBus.addEventListener('resetCart', () => {
        console.log('resetCart');
        articleCartStore.clean();
        orderModal = false;
    });

    const deleteArticle = async (articleId: number) => {
        articleCart.update(cart => cart.filter(a => a.articleId !== articleId));

        const user = get(userStore);
        const cartNow = get(articleCart);
        await fetch('/market/cards', {
            method: 'PATCH',
            body: JSON.stringify({
                id: user?.cardID,
                cardDetails: JSON.stringify(cartNow)
            })
        });
    }

    const incrementQuantity = (articleId: number) => {
        articleCart.update(cart =>
            cart.map(a => a.articleId === articleId ? { ...a, quantity: a.quantity + 1 } : a)
        );
    }

    const decrementQuantity = (articleId: number) => {
        articleCart.update(cart =>
            cart.map(a => a.articleId === articleId ? { ...a, quantity: Math.max(1, a.quantity - 1) } : a)
        );
    }
    
</script>

<div in:fly={{ x: 700 }} out:fly={{ x: 700 }} class="w-96 rounded-2xl border-2 gap-2 border-base-200 fixed z-20 top-16 p-4 right-2 flex flex-col justify-between items-center max-h-[500px] transition-all duration-300 bg-base-200/60 shadow-lg backdrop-blur-sm">
    <div class="flex justify-between items-center w-full h-full">
        <h1 class="text-lg font-Raleway font-extrabold">MON PANIER</h1>
        <button onclick={() => resetCart()} class="btn btn-error btn-sm rounded-full">Vider</button>
    </div>
    <div class="flex flex-col gap-2 overflow-y-auto no-scrollbar justify-start items-center w-full h-full">
        {#each $articleCart as article}
            <div in:fly={{ y: 700 }} out:fly={{ y: 700 }} class="flex p-2 items-center gap-2 w-full bg-base-200/60 rounded-2xl border-2 border-base-200 hover:bg-primary/40 shadow-sm transition-all duration-300">
                <img src={article.articleImage} alt={article.articleName} class="rounded-full object-cover border-4 border-base-200 w-14 h-14">
                <div class="flex gap-2 justify-between w-full">
                    <div class="flex flex-col">
                        <h2 class="font-Raleway text-lg font-bold">{article.articleName}</h2>
                        <h2 class="font-Raleway text-sm font-bold">{article.articlePrice} XOF</h2>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex h-full items-center gap-2">
                            <button onclick={() => decrementQuantity(article.articleId)} class="btn btn-xs btn-primary">-</button>
                            <h2 class="font-Raleway text-sm font-bold">{article.quantity}</h2>
                            <button onclick={() => incrementQuantity(article.articleId)} class="btn btn-xs btn-primary">+</button>
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
        <button onclick={() => orderModal = true} class="btn btn-primary btn-sm rounded-full">Commander</button>
    </div>
</div>

{#if orderModal}
    <div transition:fade={{duration: 300}} class="absolute top-0 left-0 w-full h-full bg-base-200/60 backdrop-blur-xs px-4 flex items-center justify-center z-50">
      <div transition:fade={{duration: 100}} class="max-w-7xl flex flex-col bg-base-200/60 backdrop-blur-xs min-w-96 w-full rounded-lg border-2 border-base-200 shadow-lg">
        <div class="flex flex-row gap-2 justify-end items-center p-4 border-b-2 border-base-200">
        <button aria-label="fermer" onclick={() => orderModal = false} class="btn btn-error btn-sm btn-circle btn-error/20 hover:btn-error/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> 
            </g>
          </svg>
        </button>
      </div>
        <OrderModal order={$articleCart} />
      </div>
    </div>
{/if}
