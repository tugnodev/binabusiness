<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import ArticleCard from '$lib/client/components/articleCard.svelte';
    
    const { data } = $props();

    
</script>

<div class="w-full h-full overflow-y-auto no-scrollbar" >
    <Section class="flex flex-col min-h-screen gap-4 xl:mt-0 p-4 bg-base-200/60 w-full items-center justify-start">
        <div class="flex flex-col items-center justify-center gap-6">
            <div class="w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-center gap-4">
                <!-- Hero -->
                <div class="flex flex-col items-start gap-2">
                    <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
                        <!-- market icon -->
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M5 7v13a1 1 0 001 1h12a1 1 0 001-1V7M9 7V4a3 3 0 016 0v3"></path></svg>
                        Market
                    </div>

                    <h1 class="text-4xl md:text-5xl font-Raleway font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Explorez les articles
                    </h1>

                    <p class="text-sm md:text-base text-muted-foreground max-w-xl">
                        Découvrez, comparez et ajoutez facilement des articles à votre carte. Filtrez par catégorie, triez par popularité et utilisez la recherche rapide pour trouver ce que vous cherchez.
                    </p>
                </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each data.articles as article}
                <ArticleCard article={article} card={data.card}/>
            {/each}
        </div>
        </div>
    </Section>
</div>