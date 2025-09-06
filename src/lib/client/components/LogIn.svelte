<script lang="ts">
    import { authClient } from "$lib/client/auth.client.js";
	import { slide } from "svelte/transition";
    let email = $state('');
    let password = $state('');

    function submit() {
        authClient.signIn(email, password);
    }
</script>

<div in:slide={{ duration: 200, delay: 100 }} out:slide={{ duration: 200, delay: 100 }} class="flex flex-col items-center justify-center max-w-96 w-full bg-base-200/60 p-6">
    <h1 class="text-3xl pb-6 font-Raleway font-bold text-secondary" >Connexion</h1>
    <form class="flex flex-col gap-4 w-full" action="" method="get" onsubmit={submit}>
        <input class="bg-base-200/0 text-secondary w-full input input-secondary" placeholder="Email" type="text" name="email" id="email" bind:value={email}>
        <input class="bg-base-200/0 text-secondary w-full input input-secondary" placeholder="Mot de passe" type="password" name="password" id="password" bind:value={password}>
        <button class="btn btn-secondary" type="submit">Se connecter</button>
    </form>
    <div class="divider">OU</div>
    <div class="flex items-center justify-center gap-2 w-full">
        <button class="btn btn-base-100 w-full" onclick={() => authClient.signInWithGoogle()}>Se connecter avec Google</button>
    </div>
</div>

<style>
    input:focus {
        border: none;
    }
</style>
