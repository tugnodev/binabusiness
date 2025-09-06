<script lang="ts">
	import '../../app.css';
	import Header from '$lib/client/components/header.svelte';
	import { articleCartStore } from '$lib/stores/articlesStore.js';
    import { userStore } from '$lib/stores/user.js';
	import type { User, Cards } from '@prisma/client';

	let { children, data } = $props();
	const user = data.user as User;
    const card = data.card as Cards;
    const cardDetails = JSON.parse(card.cardDetails);
    articleCartStore.set(cardDetails);
    userStore.set({
        id: user.id!,
        name: user.name!,
        email: user.email!,
        image: user.image!,
        cardID: card.id
    });
</script>

<Header />
<div class="w-full h-full pt-16 fixed z-10 bg-base-200/40">
	{@render children()}
    <footer class="z-50 bottom-0 w-full bg-base-200/60 backdrop-blur-sm text-base-content p-4">
        <aside class="w-full text-sm text-center flex justify-center items-center">
            <p>Copyright © {new Date().getFullYear()} - All right reserved by tugnodev - tugnodev@gmail.com</p>
        </aside>
    </footer>
</div>