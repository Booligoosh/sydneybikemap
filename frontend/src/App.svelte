<script lang="ts">
  import { onMount } from "svelte";
  import Infobox from "./lib/Infobox.svelte";
  import Map from "./lib/Map.svelte";
</script>

<main class="flex flex-col">
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
