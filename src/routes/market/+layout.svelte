<script lang="ts">
	import '../../app.css';
	import Header from '$lib/client/components/header.svelte';

	let { children } = $props();
</script>

<Header />
<div class="w-full h-full absolute z-10 bg-base-200/60">
	{@render children()}
</div>
