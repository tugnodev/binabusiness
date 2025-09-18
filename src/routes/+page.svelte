<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import '@fontsource-variable/playfair-display'
    import SignIn from '$lib/client/components/SignIn.svelte';
    import LogIn from '$lib/client/components/LogIn.svelte';

    let account = $state(true);
    let toggle = () => {
        account = !account;
    };
    
</script>

<div class="fixed z-20 w-full max-h-screen overflow-y-auto bg-base-200/60 flex flex-col items-center justify-start">
    <Section class="w-full h-screen flex flex-col items-center justify-start md:pb-20">
        <h1 class="text-4xl w-full text-center text-secondary font-Raleway p-6 font-bold"><span class="text-primary">BINA</span>BUSINESS</h1>
        <div class="bg-primary/20 p-6 flex flex-col md:flex-row items-center justify-start gap-4 w-full h-full">
            <h2 class="xv text-4xl md:text-6xl text-secondary font-PlayfairDisplay">Boutique de style et d'accessoires modernes</h2>
            <div class="flex w-full flex-col items-center justify-center gap-2">
                <h3 class="text-md text-secondary font-Raleway">Connectez-vous pour acceder a la boutique</h3>
                {#if !account}
                    <SignIn />
                {:else}
                    <LogIn />
                {/if}
                <div class="w-full hidden md:flex p-6 items-center justify-center gap-2">
                    {#if !account}
                        <h2 class="text-md text-secondary font-Raleway">J'ai deja un compte</h2>
                        <button class="btn btn-xs btn-accent" onclick={toggle}>Se connecter</button>
                    {:else}
                        <h2 class="text-md text-secondary font-Raleway">Je n'ai pas de compte</h2>
                        <button class="btn btn-xs btn-accent" onclick={toggle}>S'inscrire</button>
                    {/if}
                </div>
                <div class="w-full flex p-6 md:hidden items-center justify-center gap-2">
                    <h2 class="text-md text-secondary font-Raleway">J'ai deja un compte</h2>
                    <button class="btn btn-xs btn-accent" onclick={toggle}>Se connecter</button>
                </div>
            </div>
        </div>
    </Section>
    
</div>

<style>
    .xv {
        font-family: 'Playfair Display Variable', serif;
    }
</style>