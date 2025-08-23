<script lang="ts">
	import '../../app.css';
	import Header from '$lib/client/components/admin.header.svelte';

	let { children } = $props();
</script>

<Header />
{@render children()}
