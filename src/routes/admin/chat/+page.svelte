<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';

</script>

<main class="z-10 w-full h-full">
    <Section class="flex flex-col min-h-screen gap-4 xl:mt-0 p-4 bg-base-200/60 w-full items-center justify-center">
        <div>
            <div class="flex flex-col gap-2 items-center">
                <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash p-2">Commandes</h1>
                <h2>La liste des commandes</h2>
            </div>
            <div class="flex flex-col gap-2 items-center">
                <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash p-2">Discussions</h1>
                <h2>La liste des discussions</h2>
            </div>
        </div>
    </Section>
</main>
