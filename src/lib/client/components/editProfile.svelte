<script lang="ts">
	import { goto } from "$app/navigation";
    import { authClient } from "$lib/client/auth.client.js";

    const {user} = $props();
    let password = $state('');
    let newPassword = $state('');
    let confirmPassword = $state('');

    const changePassword = async () => {
        const res = await authClient.changePassword({
            newPassword,
            currentPassword: password
        });
        if(res === "mot de passe changé avec succès"){
            goto('/');
        }else{
            alert(res);
        }  
    }

</script>

<div class="max-w-96 w-full flex flex-col justify-center items-center rounded-lg">
    <div>
        <h2 class="text-2xl font-bold font-Raleway">Modifier le mot de passe</h2>
    </div>
    <form 
    class="flex items-center justify-between w-full flex-col gap-4 p-4" action="">
        <input class="input input-error bg-transparent" type="password" bind:value={password} placeholder="Mot de passe actuel" name="password">
        <input class="input input-primary bg-transparent" type="password" bind:value={newPassword} placeholder="Nouveau mot de passe" name="newPassword">
        <input class="input input-primary bg-transparent" type="password" bind:value={confirmPassword} placeholder="Confirmer le nouveau mot de passe" name="confirmPassword">
        <button onclick={changePassword} class="btn btn-primary" type="submit">Changer de mot de passe</button>
    </form>
</div>