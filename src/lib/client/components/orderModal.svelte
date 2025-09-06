<script lang="ts">
	import { fly } from "svelte/transition";
    import { userStore } from "$lib/stores/user.js";
    import type { Articlecart } from "./panier.svelte";
    import { eventBus } from "../articlesClient.js";
    import { get } from 'svelte/store';


    const {order} = $props()
    const orderArray = $state<Articlecart[]>(order);
    let notif = $state(false);


    async function sendCommande() {
        const articleDetails = orderArray.map(article => {
            return {
                titre: article.articleName,
                images: article.articleImage,
                prix: article.articlePrice,
                quantity: article.quantity
            }
        });
        const user = get(userStore);
        const res = await fetch('/market/commandes', {
            method: 'POST',
            body: JSON.stringify({
                articleDetails: JSON.stringify(articleDetails),
                buyerId: user?.id,
            })
        });
        console.log(res)
        if (res.ok) {
            notif = true;
            setTimeout(() => {
                notif = false;
            }, 3000);
        }
        console.log('resetCart 1');
        eventBus.dispatchEvent(new CustomEvent('resetCart'));
        console.log('resetCart 2');
    }
</script>

{#if notif}
    <div in:fly={{ x: 100 }} out:fly={{ x: 100 }} class="fixed z-50 top-1 left-1 w-96 alert alert-success">
        <span>Commande enregistrée avec succès</span>
    </div>
{/if}

<div in:fly={{ y: -100, duration: 300 }} out:fly={{ y: -100, duration: 300 }} class="border-2 border-base-200 p-4">
    <h3 class="font-bold text-lg">Passer la commande</h3>
    <p class="py-4">Veuillez confirmer votre commande en cliquant sur le bouton ci-dessous.</p>
    <div class="flex flex-col gap-2 max-h-96 overflow-y-auto no-scrollbar">
        {#each orderArray as article}
            <div class="flex p-2 items-center gap-2 w-full bg-base-200/60 rounded-2xl border-2 border-base-200 hover:bg-primary/40 shadow-sm transition-all duration-300">
                <img src={article.articleImage} alt={article.articleName} class="rounded-full object-cover border-4 border-base-200 w-14 h-14">
                <div class="flex gap-2 justify-between w-full">
                    <div class="flex flex-col">
                        <h2 class="font-Raleway text-lg font-bold">{article.articleName}</h2>
                        <h2 class="font-Raleway text-sm font-bold">{article.articlePrice} XOF</h2>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex h-full items-center gap-2">
                            <h2 class="font-Raleway text-sm font-bold">Quantité: {article.quantity}</h2>
                        </div>
                        <h2 class="font-Raleway text-sm font-bold">Total: {article.articlePrice * article.quantity} XOF</h2>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="modal-action">
        <button onclick={sendCommande} class="btn btn-sm btn-primary">Confirmer la commande</button>
    </div>
</div>