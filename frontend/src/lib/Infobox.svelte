<script lang="ts">
  import Legend from "./Legend.svelte";
  import Logo from "./Logo.svelte";
  import { ChevronDownIcon } from "@rgossiaux/svelte-heroicons/solid";

  // Only start expanded if they've never visited the site before (or not since the latest update)
  let expanded = localStorage.getItem("lastVisitedVersion") !== "2";
</script>

<div
  class="sm:fixed inset-5 z-10 sm:rounded-lg bg-white w-full sm:w-auto sm:max-w-sm sm:shadow-md border-gray-500 h-fit mx-auto lg:mx-0"
>
  <section>
    <button
      class="group/header grid grid-cols-[1fr,auto] w-full text-left p-3"
      on:click={() => {
        // Toggle expanded state
        expanded = !expanded;
        // Trigger map to resize (as on sm and below, its area will change when the infobox is expanded/collapsed)
        setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
      }}
    >
      <Logo />
      <div
        class="h-full justify-self-end border rounded-full aspect-square flex justify-center items-center group-hover/header:bg-gray-50 group-active/header:bg-gray-100 transition-transform text-gray-600"
        style:transform={expanded ? "rotate(180deg)" : ""}
      >
        <ChevronDownIcon class="w-5" />
      </div>
    </button>
  </section>
  <!--
    Based on this trick https://stackoverflow.com/a/8331169
    Don't transition at sm and below as it leads to janky map resizing
  -->
  <div
    class="sm:transition-[max-height] overflow-hidden"
    style:max-height={expanded ? "100vh" : 0}
  >
    <div class="flex flex-col gap-3 p-3 pt-0">
      <section><p>Your guide to Sydney&rsquo;s cycle network 🚲️</p></section>
      <Legend />
      <section>
        <div class="text-xs mt-1">
          Built by <a href="https://ethan.link" target="_blank">Ethan</a> | Data
          &copy;
          <a href="https://www.openstreetmap.org/copyright" target="_blank"
            >OpenStreetMap</a
          >
          contributors
        </div>
        <div class="text-xs mt-0.5">
          <a href="https://github.com/booligoosh/sydneybikemap" target="_blank"
            >View code</a
          >
          |
          <a
            href="https://github.com/Booligoosh/sydneybikemap#improving-the-data"
            target="_blank">Improve data</a
          >
          |
          <a href="mailto:sydneybikemap@ethan.link">Contact</a>
          |
          <a
            href="https://github.com/Booligoosh/sydneybikemap#roadmap"
            target="_blank">Roadmap</a
          >
        </div>
      </section>
    </div>
  </div>
</div>
