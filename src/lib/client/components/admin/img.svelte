<script lang="ts">
    let { src, input } = $props();
</script>

<div class="w-24 h-24 justify-center items-center rounded-lg bg-base-300 overflow-hidden join-item" >
    <img src={src} alt="preview" bind:this={input} class="w-full h-full object-cover">
</div>
