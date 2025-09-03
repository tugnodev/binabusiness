<script lang="ts">
    import { fly } from "svelte/transition";
    import Logout from "./logout.svelte";
	import LogIn from "./LogIn.svelte";

    let isOpen = $state(false)
    function toggle() {
        isOpen = !isOpen
    }
    let redirect = (url: string) => {
        window.location.href = url
        isOpen = false
    }
</script>

<button aria-label="Burger" class="z-40 btn btn-primary" onclick={toggle}>
    {#if !isOpen}
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </span>
    {:else}
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
    {/if}
</button>
{#if isOpen}
<div in:fly={{ x: -500 }} out:fly={{ x: -500 }} class="fixed z-30 top-0 p-4 left-0 flex flex-col justify-center shadow-lg items-center w-full md:w-96 h-full bg-base-200/60 backdrop-blur-sm">
    <ul class="flex flex-col text-center font-Raleway font-bold text-xl text-secondary w-full">
        <li class="p-2 w-full border-b border-secondary border-t "><button class="w-full" onclick={() => redirect('/market')}>Acceil</button></li>
        <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/market/arrivages')}>Arrivages</button></li>
        <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/market/commandes')}>Commandes</button></li>
        <li class="p-2 w-full border-b border-secondary"><button class="w-full" onclick={() => redirect('/market/settings')}>Parametres</button></li>
    </ul>
</div>
{/if}
