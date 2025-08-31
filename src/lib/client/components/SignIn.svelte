<script lang="ts">
    import { authClient } from "$lib/client/auth.client.js";
    import { slide } from "svelte/transition";

    let same = $state(false);
    let name = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');

    $effect(() => {
        if(password === confirmPassword && confirmPassword !== ''){
            same = true;
        }else{
            same = false;
        }
    })


    function submit() {
        authClient.signUp(email, name, password);
    }

</script>

<div in:slide={{ delay: 100 }} out:slide={{ delay: 100 }} class="flex flex-col items-center justify-center w-96 bg-base-200/60 p-6">
    <h1 class="text-3xl pb-6 font-Raleway font-bold text-secondary">INSCRIPTION</h1>
    <form class="flex flex-col gap-4 w-full" onsubmit={submit}>
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" bind:value={name} type="text" name="name" placeholder="Nom complet" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" bind:value={email} type="email" name="email" placeholder="Email" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" bind:value={password} type="password" name="password" placeholder="Mot de passe" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" bind:value={confirmPassword} type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
            <button type="submit" class="btn btn-secondary" disabled={!same}>S'inscrire</button>
        {#if password !== confirmPassword && confirmPassword !== ''}
            <span class="text-red-500">Les mots de passe ne sont pas identiques</span>
        {/if}
    </form>
    <div class="divider">OU</div>
    <div class="flex items-center justify-center gap-2 w-full">
        <button class="btn btn-base-100 w-full" onclick={() => authClient.signInWithGoogle()}>S'inscrire avec Google</button>
    </div>
</div>

<style>
    input:focus {
        border: none;
    }
</style>
