<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import ArticleCard from '$lib/client/components/articleCard.svelte';
    import { articleCartStore } from '$lib/stores/articlesStore.js';
    import { userStore } from '$lib/stores/user.js';
	import type { User, Cards } from '@prisma/client';
    const { data } = $props();

    const user = data.user as User;
    const card = data.card as Cards;
    const cardDetails = JSON.parse(card.cardDetails);
    articleCartStore.set(cardDetails);
    userStore.set({
        id: user.id!,
        name: user.name!,
        email: user.email!,
        image: user.image!,
        cardID: card.id
    });
</script>

<div class="z-10 w-full h-full overflow-y-auto no-scrollbar" >
    <Section class="flex flex-col min-h-screen gap-4 xl:mt-0 p-4 bg-base-200/60 w-full items-center justify-start">
        <div class="flex flex-col items-center justify-center gap-6">
            <h1 class="text-4xl font-Raleway font-bold text-primary">Market</h1>
            <h2 class="text-secondary font-Raleway">La liste des articles</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each data.articles as article}
                <ArticleCard article={article} card={data.card}/>
            {/each}
        </div>
    </Section>
</div>