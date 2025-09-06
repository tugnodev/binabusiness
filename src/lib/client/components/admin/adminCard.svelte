<script lang="ts">
	import { goto } from "$app/navigation";
    export let card: any;
    import { authClient } from "$lib/client/auth.client.js"; 

    let shopename = "BinaBusiness";

    const logout = () => {
        authClient.signOut();
        goto('/');
    }
</script>

<div class="card w-96 bg-base-200/60 rounded-lg border-2 border-base-200 shadow-xl">
    <div class="card-body">
        <div class="flex justify-between">
            <h2 class="card-title">{card.name}</h2>
            <h2 class="card-title text-primary">{shopename.toUpperCase()}</h2>
        </div>
        <p>{card.email}</p>
        <div class="card-actions justify-end">
            <button onclick={logout} class="btn btn-error btn-sm">Deconnexion</button>
        </div>
    </div>
</div>