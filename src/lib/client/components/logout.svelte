<script lang="ts">
    import { authClient } from "../auth.client.js";
    import { goto } from "$app/navigation";

    const { show } = $props()

</script>

<button class="{show ? "flex" : "hidden" } z-40 btn btn-primary items-center gap-2"
    onclick={async () => {
        await authClient.signOut();
        goto("/login");
    }}
>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path d="M16 17l5-5m0 0l-5-5m5 5H9m4 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Logout
</button>
