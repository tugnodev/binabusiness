<script lang="ts">
import "../app.css";

const { children } = $props();

</script>


<div class="w-full min-h-screen flex flex-col items-center justify-center blur-sm fixed z-0">
</div>
{@render children()}


<style>
    div {
        background: url("/background.jpg") no-repeat center center fixed;
        background-size: cover;
    }
</style>