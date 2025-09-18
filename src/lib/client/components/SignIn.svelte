<script lang="ts">
	import { enhance } from "$app/forms";
    import { slide } from "svelte/transition";
	import { authClient } from "../auth.client.js";

    let same = $state(false);
    let name = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let alert = $state(false);

    $effect(() => {
        if(password === confirmPassword && confirmPassword !== ''){
            same = true;
        }else{
            same = false;
        }
    })


    async function submit() {
        const res = await authClient.signUp(email, name, password);
        if(res){
            alert = true;
            setTimeout(() => {
                alert = false;
            }, 3000);
            return;
        }
    }

</script>

<div in:slide={{ delay: 100 }} out:slide={{ delay: 100 }} class="flex flex-col items-center justify-center max-w-96 w-full bg-base-200/60 p-6">
    <h1 class="text-3xl pb-6 font-Raleway font-bold text-secondary">INSCRIPTION</h1>
    <form class="flex flex-col gap-4 w-full" onsubmit={submit}>
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" required bind:value={name} type="text" name="name" placeholder="Nom complet" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" required bind:value={email} type="email" name="email" placeholder="Email" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" required bind:value={password} type="password" name="password" placeholder="Mot de passe" />
            <input class="bg-base-200/0 text-secondary w-full input input-secondary" required bind:value={confirmPassword} type="password" placeholder="Confirmer le mot de passe" />
            <button type="submit" class="btn btn-secondary" disabled={!same}>S'inscrire</button>
        {#if password !== confirmPassword && confirmPassword !== ''}
            <span class="text-red-500">Les mots de passe ne sont pas identiques</span>
        {/if}
        {#if alert}
        <span in:slide={{ duration: 200, delay: 100 }} out:slide={{ duration: 200, delay: 100 }} class="alert alert-error p-2 w-full">Email ou mot de passe incorrect</span>
        {/if}
    </form>
    <div class="divider">OU</div>
    <button class="btn btn-base-100 w-full" onclick={authClient.signInWithGoogle}>S'inscrire avec Google</button>
</div>

<style>
    input:focus {
        border: none;
    }
</style>
