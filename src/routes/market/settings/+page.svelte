<script lang="ts">
    import Section from '$lib/client/components/Section.svelte';
    //import { authClient } from '$lib/client/articlesClient.js';
	import UserCard from '$lib/client/components/userCard.svelte';

    export let data: { user: any; };
    
</script>

<main class=" bg-base-200/60 h-full w-full">
    <Section class="">
        <div class="w-full flex justify-center">
            <UserCard user={data.user} />
        </div>
    </Section>
</main>
