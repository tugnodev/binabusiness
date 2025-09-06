<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import { redirect } from '@sveltejs/kit';
    const { data } = $props();

    type state = {
        av: number,

    }

    const state = {
        "Articles en vente :" : data.states.av,
        "Articles en rupture :" : data.states.ar,
        "commandes en cours :" : data.states.ac,
        "Commandes en delivrees :" : data.states.as
    }
</script>


<main class="z-10 w-full h-full">
    <Section class="flex flex-col h-full overflow-y-auto no-scrollbar gap-4 xl:mt-0 p-4 bg-base-200/60 w-full items-center justify-center">
        <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-2">
            <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash p-2">Tableau de bord</h1>
            <div class="flex gap-2">
                <a class="btn btn-primary" href="/admin/articles/">Ajouter un article</a>
                <a class="btn btn-primary" href="/admin/orders/">Voire les commandes</a>
            </div>
        </div>
        <div class="stat stats-vertical border-2 border-base-200 shadow-lg backdrop-blur-xs rounded-lg lg:stats-horizontal bg-base-200/60">
            {#each Object.entries(state) as [key, value]}
                <div class="stat">
                    <h2 class="stat-title text-secondary font-Raleway font-bold text-xl">{key}</h2>
                    <p class="stat-value text-secondary font-Raleway">{value}</p>
                </div>
            {/each}
        </div>
    </Section>
</main>