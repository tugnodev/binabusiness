<script lang="ts">
    import { fly } from "svelte/transition";

    let isOpen = $state(false)
    function toggle() {
        isOpen = !isOpen
    }

    let redirect = (url: string) => {
        window.location.href = url
        isOpen = false
    }
</script>

<button aria-label="Burger" class="{isOpen ? 'hidden' : 'block'} z-30 btn btn-primary" onclick={toggle}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
</button>
<button aria-label="Close" class="{isOpen ? 'block' : 'hidden'} z-30 btn btn-primary" onclick={toggle}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
</button>
{#if isOpen}
    <div in:fly={{ x: -500 }} out:fly={{ x: -500 }} class="fixed z-20 top-0 p-4 left-0 flex flex-col justify-center items-center w-full md:w-96 h-full bg-base-200 sm:bg-base-200/90 shadow-lg">
        <ul class="flex flex-col text-center font-Raleway font-bold text-xl text-secondary w-full">
            <li class="p-2 w-full border-b border-secondary border-t "><button class="w-full" onclick={() => redirect('/admin')}>Tableau de bord</button></li>
            <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/admin/articles')}>Articles</button></li>
            <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/admin/commandes')}>Commandes</button></li>
            <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/admin/settings')}>Parametres</button></li>
        </ul>
    </div>
{/if}
