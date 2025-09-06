<script lang="ts">
	import AdminCard from '$lib/client/components/admin/adminCard.svelte';
    import Section from '$lib/client/components/Section.svelte';
    
    
    const { data } = $props();
</script>

<main class="z-10 w-full flex flex-col items-center h-full">
    <Section class="flex flex-col h-full overflow-y-auto no-scrollbar gap-4 xl:mt-0 p-4 bg-base-200/60 w-full justify-start items-center">
        <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-2">
            <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash p-2">Paramètres</h1>
        </div>
        <div>
            <AdminCard card={data.card} />
        </div>
    </Section>
</main>