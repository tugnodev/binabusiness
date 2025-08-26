<script lang="ts">
    import AdminBurger from './admin.burger.svelte';
</script>

<header class="flex justify-between items-center fixed z-30 w-full bg-base-200/60 p-2 shadow-sm h-16">
    <AdminBurger />
    <div>
        <h1 class="text-2xl font-Raleway font-extrabold" ><span class="text-primary">Bina</span><span class="text-secondary">Admin</span></h1>
    </div>
    <div>
        <a href="/market" class="btn btn-infos" aria-label="Se deconnecter">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        </a>
    </div>
</header>