<script lang="ts">
  import Legend from "$lib/Legend.svelte";
  import Logo from "$lib/Logo.svelte";
  import { cn, Panel } from "@carto-au/svelte";
  import { REGIONS, type RegionConfig } from "./regions";

  interface Props {
    regionConfig: RegionConfig;
  }
  let { regionConfig }: Props = $props();

  // Only start expanded if they've never visited the site before (or not since the latest update)
  let expanded = globalThis.localStorage?.getItem("lastVisitedVersion") !== "3";
</script>

<Panel hideableName="legend" showHideableInitially={expanded}>
  {#snippet staticHeader()}
    <div class="p-3">
      <div class="mb-1.5 text-xs">
        {#each REGIONS as region}<a
            href={`/${region.id}`}
            class={cn(
              "text-inherit!",
              regionConfig.id === region.id && "font-semibold",
            )}>{region.name}</a
          > |&nbsp;
        {/each}
        <span class="italic opacity-50">More coming soon!</span>
      </div>
      <Logo regionName={regionConfig.name} />
    </div>
  {/snippet}
  <!-- {#snippet staticFooter()}
    <div class="p-3 sm:pt-0">
      <input
        placeholder="Search&hellip;"
        class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none"
      />
    </div>
  {/snippet} -->
  {#snippet hideable()}
    <div class="flex flex-col p-3">
      <Legend />
    </div>
    <footer class="border-t border-inherit bg-gray-100 p-3 pt-2">
      <div class="mt-1 text-xs">
        Built by <a href="https://ethan.link" target="_blank">Ethan</a> | Data
        &copy;
        <a href="https://www.openstreetmap.org/copyright" target="_blank"
          >OpenStreetMap</a
        >
        contributors
      </div>
      <div class="mt-0.5 text-xs">
        <a href="https://github.com/carto-au/bikemap" target="_blank"
          >View code</a
        >
        |
        <a
          href="https://github.com/carto-au/bikemap#improving-the-data"
          target="_blank">Improve data</a
        >
        |
        <a href="mailto:sydneybikemap@ethan.link">Contact</a>
        |
        <a href="https://github.com/carto-au/bikemap#roadmap" target="_blank"
          >Roadmap</a
        >
      </div>
    </footer>
  {/snippet}
</Panel>
