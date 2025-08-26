<script lang="ts">
	import Burger from './burger.svelte';
</script>

<header class="flex justify-between items-center fixed z-30 w-full bg-base-200/60 p-2 shadow-sm h-16">
    <Burger />
    <div class="flex">
        <h1 class="text-2xl font-Raleway font-extrabold" ><span class="text-primary">Bina</span><span class="text-secondary">Business</span></h1>
    </div>
    <div class="flex btn btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
    </div>
</header>
