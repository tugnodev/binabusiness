<script lang="ts">
	import '../../app.css';
	import Header from '$lib/client/components/header.svelte';

	let { children } = $props();
</script>

<Header />
<div class="w-full h-full pt-16 fixed z-10 bg-base-200/60">
	{@render children()}
</div>
