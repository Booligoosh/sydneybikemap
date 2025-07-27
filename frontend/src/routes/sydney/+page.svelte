<script lang="ts">
  import Infobox from "$lib/Infobox.svelte";
  import Map from "$lib/Map.svelte";
</script>

<main class="flex flex-col select-none">
  <Infobox />
  <Map />
</main>

<style>
  main {
    height: 100vh;
    /* See https://web.dev/viewport-units/ */
    height: 100dvh;
  }
</style>
