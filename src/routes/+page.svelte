<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import '@fontsource-variable/playfair-display'
	import { authClient } from "$lib/client/auth.client.js";
	import { redirect } from '@sveltejs/kit';
    import SignIn from '$lib/client/components/SignIn.svelte';
    const session = authClient.getSession();

    let member = $state(false);
    
    if( session.value?.data ) {
        redirect(308,"/market");
    }
</script>

<div class="fixed z-20 w-full h-screen bg-base-200/60 flex items-center justify-center">
    <Section class="fixed z-30 w-full h-screen flex flex-col items-center justify-start sm:pb-20">
        <h1 class="text-4xl w-full text-center text-secondary font-Raleway p-6 font-bold"><span class="text-primary">BINA</span>BUSINESS</h1>
        <div class="bg-primary/20 p-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full h-full">
            <h2 class="xv text-4xl sm:text-6xl flex-1 text-secondary font-PlayfairDisplay">Boutique de style et d'accessoires modernes</h2>
            <div class="flex flex-col items-center justify-center gap-2 flex-1">
                <h3 class="text-md text-secondary font-Raleway">Connectez-vous pour acceder a la boutique</h3>
                <SignIn />
                <div class="w-full flex p-6 items-center justify-center gap-2">
                    <h2 class="text-md text-secondary font-Raleway">J'ai deja un compte</h2>
                    <button class="btn btn-xs btn-accent">Se connecter</button>
                </div>
            </div>
        </div>
        <div class="w-full flex p-6 sm:hidden items-center justify-center gap-2">
            <h2 class="text-md text-secondary font-Raleway">J'ai deja un compte</h2>
            <button class="btn btn-xs btn-accent">Se connecter</button>
        </div>
        
    </Section>
</div>

<style>
    .xv {
        font-family: 'Playfair Display Variable', serif;
    }
</style>