<script lang="ts">
  import Legend from "./Legend.svelte";
  import Logo from "./Logo.svelte";
  import { ChevronDownIcon } from "@rgossiaux/svelte-heroicons/solid";

  // Only start expanded if they've never visited the site before
  let expanded = localStorage.getItem("lastVisitedVersion") ? false : true;
</script>

<div
  class="sm:fixed inset-5 z-10 sm:rounded-lg bg-white p-3 w-full sm:w-auto sm:max-w-sm sm:shadow-md border-gray-500 h-fit flex flex-col gap-3 mx-auto lg:mx-0"
>
  <section>
    <button
      class="group/header grid grid-cols-[1fr,auto] w-full text-left"
      on:click={() => (expanded = !expanded)}
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
  <div style:display={expanded ? "contents" : "none"}>
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
