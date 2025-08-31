<script lang="ts">
    import { authClient } from "$lib/client/auth.client.js";
    import { redirect } from "@sveltejs/kit";
    const session = authClient.getSession();

    if(session.value?.data){
        redirect(308,"/market");
    }
</script>

<div class="fixed z-30 w-full h-full flex justify-center items-center" >
    <a class="btn btn-primary" href="/">Aller a la page d'accueil</a>
</div>
