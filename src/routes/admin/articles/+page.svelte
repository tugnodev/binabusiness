<script lang="ts">
	import AddArticleForm from '$lib/client/components/addArticleForm.svelte';
    import Section from '$lib/client/components/Section.svelte';
</script>

<main class="mt-16 z-10 w-full h-screen flex items-center justify-start">
    <Section class="flex flex-col gap-4 p-6 bg-base-200/60 w-full h-full items-center justify-center">
        <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash p-2">Articles</h1>
        <div>
            <AddArticleForm />
        </div>
    </Section>
</main>