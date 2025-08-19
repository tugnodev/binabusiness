<script lang="ts">
	import '../../app.css';
	import Header from '$lib/components/admin.header.svelte';

	let { children } = $props();
</script>

<Header />
{@render children()}
