<script lang="ts">
    import type { createArticleDto } from "../articlesClient.js";
    import type { Articlecart } from "./panier.svelte";
    import { articleCart, articleCartStore } from "$lib/stores/articlesStore.js";
    import OrderModal from "./orderModal.svelte";
    import { eventBus } from "../articlesClient.js";
	  import { fade } from "svelte/transition";
	  import { get } from 'svelte/store';
	import { goto } from "$app/navigation";

    const {article, card} = $props()
    let modal = $state(false);
    let orderModal = $state(false);

    const orderArray: Articlecart[] = [{articleId: article.id!, articleName: article.titre, articleImage: article.images[0], articlePrice: article.prix, quantity: 1}];

    function toggleModal() {
      modal = false;
      orderModal = true;
    }

    async function addToCart(article: createArticleDto) {
      const newArticle: Articlecart = {
        articleId: article.id!,
        articleName: article.titre,
        articleImage: article.images[0],
        articlePrice: article.prix,
        quantity: 1
      };
      articleCartStore.update(newArticle);

      const updatedCart = get(articleCart);
      await fetch('/market/cards', {
        method: 'PATCH',
        body: JSON.stringify({
          id: card.id,
          cardDetails: JSON.stringify(updatedCart)
        })
      });
    }

    eventBus.addEventListener('resetCart', () => {
        setTimeout(() => {
            orderModal = false;
            goto('/market/commandes');
        }, 1000);
    });

</script>


<div class="hover:scale-110 transition-all card card-sm bg-base-100 w-80 h-80 shadow-sm">
    <figure  class="hover:cursor-pointer">
      <img
        src={article.images[0]}
        alt="Some"
        class="rounded-none" />
    </figure>
    <span class="absolute shadow-lg top-2 right-2 text-lg font-bold badge badge-success">{article.prix} XOF</span>
    <div class="card-body items-center text-center">
      <div class="w-full flex flex-col justify-between gap-2">
        <h2 class="card-title text-lg flex-1 texte-Raleway">{article.titre.toUpperCase()}</h2>
        <div class="flex flex-row justify-end gap-1 flex-2 overflow-x-hidden">
            {#each article.tag as tag }
                <span class="text-xs badge badge-primary">{tag}</span>
            {/each}
        </div>
      </div>
      <p class="texte-Raleway">{article.description}</p>
      <div class="card-actions w-full flex justify-between items-center gap-1">
        <button onclick={() => modal = true} class="btn btn-sm btn-primary">Voire le produit</button>
        <div class="flex flex-row gap-1">
          <button onclick={() => orderModal = true} aria-label="Acheter" class="btn btn-sm btn-success">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                <path d="M21 7V6.37006C21 5.17705 21 4.58055 20.842 4.09946C20.5425 3.18719 19.8468 2.47096 18.9606 2.16261C18.4933 2 17.9139 2 16.755 2H7.24502C6.08614 2 5.50671 2 5.03939 2.16261C4.15322 2.47096 3.45748 3.18719 3.15795 4.09946C3 4.58055 3 5.17705 3 6.37006V15M21 11V20.3742C21 21.2324 20.015 21.6878 19.3919 21.1176C19.0258 20.7826 18.4742 20.7826 18.1081 21.1176L17.625 21.5597C16.9834 22.1468 16.0166 22.1468 15.375 21.5597C14.7334 20.9726 13.7666 20.9726 13.125 21.5597C12.4834 22.1468 11.5166 22.1468 10.875 21.5597C10.2334 20.9726 9.26659 20.9726 8.625 21.5597C7.98341 22.1468 7.01659 22.1468 6.375 21.5597L5.8919 21.1176C5.52583 20.7826 4.97417 20.7826 4.6081 21.1176C3.985 21.6878 3 21.2324 3 20.3742V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> 
                <path d="M9.5 10.4L10.9286 12L14.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                <path d="M7.5 15.5H9M16.5 15.5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> 
              </g>
            </svg>
          </button>
          
          <button aria-label="Ajouter au panier" onclick={() => addToCart(article)} class="btn btn-sm btn-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-full w-full">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                  <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="currentColor" stroke-width="1.5"></path> 
                  <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="currentColor" stroke-width="1.5"></path> 
                  <path d="M11 10.8L12.1429 12L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                  <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> 
              </g>
          </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

{#if modal}
  <div transition:fade={{duration: 100}} class="absolute top-0 left-0 w-full h-full bg-base-200/60 backdrop-blur-xs px-4 flex items-center justify-center z-50">
    <div transition:fade={{duration: 50}} class="max-w-7xl flex flex-col bg-base-200/60 backdrop-blur-xs min-w-96 w-full rounded-lg border-2 border-base-200 shadow-lg">
      <div class="flex flex-row gap-2 justify-start-reverse items-center p-4 border-b-2 border-base-200">
        <div role="alert" class="w-full alert alert-warning alert-soft">
          <span>Veillez defiler pour voire les autres images.</span>
        </div>
        <button aria-label="fermer" onclick={() => modal = false} class="btn btn-error btn-sm btn-circle btn-error/20 hover:btn-error/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> 
            </g>
          </svg>
        </button>
      </div>
      <div class="flex flex-col md:flex-row gap-4 p-4">
        <div class="flex-1 carousel carousel-center max-h-96 w-full md:w-1/2">
          {#each article.images as image }
            <div class="carousel-item w-full" >
              <img 
                class="rounded-box object-cover w-full h-auto"
                src={image} alt={image}>
            </div>
          {/each}
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <h2 class="text-2xl font-Raleway font-bold">{article.titre}</h2>
          <p class="texte-Raleway">{article.description}</p>
          <div class="flex flex-row gap-2 flex-wrap">
            {#each article.tag as tag }
                <span class="text-xs badge badge-primary">{tag}</span>
            {/each}
          </div>
          <span class="text-xl font-bold badge badge-success w-fit">{article.prix} XOF</span>
          <div class="flex flex-row gap-2 mt-auto">
            <button onclick={toggleModal} class="btn btn-success btn-sm flex-1">Commander</button>
            <button onclick={() => addToCart(article)} class="btn btn-sm btn-info flex-1">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if orderModal}
    <div transition:fade={{duration: 500}} class="absolute top-0 left-0 w-full h-full bg-base-200/60 backdrop-blur-xs px-4 flex items-center justify-center z-50">
      <div transition:fade={{duration: 100}} class="max-w-7xl flex flex-col bg-base-200/60 backdrop-blur-xs min-w-96 h-96 overflow-y-auto no-scrollbar w-full rounded-lg border-2 border-base-200 shadow-lg">
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
        <OrderModal order={orderArray} />
      </div>
    </div>
{/if}
