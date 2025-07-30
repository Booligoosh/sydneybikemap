<script lang="ts">
  import Infobox from "$lib/Infobox.svelte";
  import Map from "$lib/Map.svelte";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  onMount(() => {
    // Future proof with a version so we can perform 'migrations' or show explainers
    // about a change in visualisation to users who were used to something else.
    //
    // For now, we're using the presence of this (don't care about the number) to see
    // if the user has visited the site before, so if we should start the infobox as
    // expanded or collapsed.
    //
    // This will always get set *after* the initial render (due to being in onMount).
    localStorage.setItem("lastVisitedVersion", "3");
  });

  $effect(() => {
    localStorage.setItem("lastRegion", data.regionConfig.id);
  });
</script>

<svelte:head>
  <!-- URL -->
  <link
    rel="canonical"
    href={`https://bikemap.carto.au/${data.regionConfig.id}`}
  />
  <meta
    property="og:url"
    content={`https://bikemap.carto.au/${data.regionConfig.id}`}
  />
  <!-- Title -->
  <title>{data.regionConfig.headTags.title}</title>
  <meta property="og:title" content={data.regionConfig.headTags.title} />
  <meta
    property="og:site_name"
    content={data.regionConfig.headTags.ogSiteName}
  />
  <!-- Description-->
  <meta name="description" content={data.regionConfig.headTags.description} />
  <meta
    name="og:description"
    content={data.regionConfig.headTags.description}
  />
  <!-- Image-->
  <meta property="og:image" content={data.regionConfig.headTags.ogImage} />
</svelte:head>

<main class="flex flex-col select-none">
  <Infobox regionConfig={data.regionConfig} />
  <Map regionConfig={data.regionConfig} />
</main>

<style>
  main {
    height: 100vh;
    /* See https://web.dev/viewport-units/ */
    height: 100dvh;
  }
</style>
