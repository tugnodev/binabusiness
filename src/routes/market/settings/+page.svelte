<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    import { authClient } from '$lib/client/auth.client.js';
	import UserCard from '$lib/client/components/userCard.svelte';

    export let data: { user: any; };
    
</script>

<main class="z-10 w-full h-full flex items-center justify-center overflow-y-auto no-scrollbar">
    <Section class="">
        <div class="w-full flex justify-center">
            <UserCard user={data.user} />
        </div>
    </Section>
</main>
