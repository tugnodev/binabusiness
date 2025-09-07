<script lang="ts">
	import { enhance } from "$app/forms";
	import { slide } from "svelte/transition";
    let email = $state('');
    let password = $state('');

    
</script>

<div in:slide={{ duration: 200, delay: 100 }} out:slide={{ duration: 200, delay: 100 }} class="flex flex-col items-center justify-center max-w-96 w-full bg-base-200/60 p-6">
    <h1 class="text-3xl pb-6 font-Raleway font-bold text-secondary" >Connexion</h1>
    <form class="flex flex-col gap-4 w-full" action="?/signIn" method="POST" use:enhance>
        <input class="bg-base-200/0 text-secondary w-full input input-secondary" placeholder="Email" type="text" name="email" id="email" bind:value={email}>
        <input class="bg-base-200/0 text-secondary w-full input input-secondary" placeholder="Mot de passe" type="password" name="password" id="password" bind:value={password}>
        <button class="btn btn-secondary" type="submit">Se connecter</button>
    </form>
    <div class="divider">OU</div>
    <form action="?/signInSocial" method="POST" class="flex items-center justify-center gap-2 w-full">
        <input type="hidden" name="provider" value="google" />
        <button class="btn btn-base-100 w-full" type="submit">S'inscrire avec Google</button>
    </form>
</div>

<style>
    input:focus {
        border: none;
    }
</style>
