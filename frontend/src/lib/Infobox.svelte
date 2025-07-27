<script lang="ts">
  import Legend from "$lib/Legend.svelte";
  import Logo from "$lib/Logo.svelte";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ChevronDown } from "@steeze-ui/heroicons";
  import { cn } from "$lib/utils";

  // Only start expanded if they've never visited the site before (or not since the latest update)
  let expanded = localStorage.getItem("lastVisitedVersion") !== "3";
</script>

<div
  class={cn(
    "inset-5 z-10 mx-auto h-fit w-full overflow-hidden border-b bg-white sm:fixed sm:w-auto sm:max-w-sm sm:rounded-lg sm:border lg:mx-0",
    expanded ? "border-gray-500" : "border-gray-300",
  )}
>
  <section>
    <button
      class="group/header grid w-full cursor-pointer grid-cols-[1fr_auto] p-3 text-left"
      on:click={() => {
        // Toggle expanded state
        expanded = !expanded;
        // Trigger map to resize (as on sm and below, its area will change when the infobox is expanded/collapsed)
        setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
      }}
    >
      <Logo />
      <div
        class="flex aspect-square h-full items-center justify-center justify-self-end rounded-full border border-gray-200 text-gray-600 transition-transform group-hover/header:bg-gray-50 group-active/header:bg-gray-100"
        style:transform={expanded ? "rotate(180deg)" : ""}
      >
        <Icon src={ChevronDown} theme="micro" class="w-5" />
      </div>
    </button>
  </section>
  <!--
    Based on this trick https://stackoverflow.com/a/8331169
    Don't transition at sm and below as it leads to janky map resizing
  -->
  <div
    class="overflow-hidden sm:transition-[max-height]"
    style:max-height={expanded ? "100vh" : 0}
  >
    <div
      class={cn(
        "flex flex-col gap-3 border-t p-3",
        expanded ? "border-gray-500" : "border-gray-300",
      )}
    >
      <!-- <section><p>Your guide to Sydney&rsquo;s cycle network 🚲️</p></section> -->
      <!-- <section>
        <input
          placeholder="Search&hellip;"
          class="rounded-md border border-gray-400 py-2 px-3 w-full text-md hover:bg-gray-50 focus:bg-gray-100 focus:outline-none"
        />
      </section> -->
      <Legend />
    </div>
    <footer class="border-t border-gray-500 bg-[#a1e3b8] p-3 pt-2">
      <div class="mt-1 text-xs">
        Built by <a href="https://ethan.link" target="_blank">Ethan</a> | Data
        &copy;
        <a href="https://www.openstreetmap.org/copyright" target="_blank"
          >OpenStreetMap</a
        >
        contributors
      </div>
      <div class="mt-0.5 text-xs">
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
    </footer>
  </div>
</div>
