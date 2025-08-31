<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';

    export let data: { role: boolean; };
    
    function goToAdmin() {
        window.location.href = '/admin';
    }
</script>

<main class="my-16 absolute z-10 w-full">
    <Section class="">
        {#if data.role}
            <div role="alert" class="alert alert-info flex items-center justify-between">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Acceder a la page admin</span>
                </div>
                <button aria-label="Acceder a la page admin" onclick={goToAdmin} class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>
        {/if}
    </Section>
</main>
