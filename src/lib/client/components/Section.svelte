<script lang="ts">
    let { children, class: className } = $props();
</script>

<section class="max-w-8xl mx-auto {className}">
    {@render children()}
</section>
