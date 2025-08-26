<script lang="ts">
	import '../../app.css';
	import Header from '$lib/client/components/admin.header.svelte';

	let { children } = $props();
</script>

<div class="w-full h-full fixed z-10 bg-base-200/60">
	<Header />
	{@render children()}
</div>
