<script lang="ts">
  import { XIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { createEventDispatcher } from "svelte";

  export let open: boolean;

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<div class="relative z-10" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    style:visibility={open ? "" : "hidden"}
    style:opacity={open ? "" : "0"}
  />

  <div
    class="fixed inset-0 w-full z-10 overflow-y-auto"
    style:visibility={open ? "" : "hidden"}
    style:opacity={open ? "" : "0"}
  >
    <button
      class="flex min-h-full justify-center p-4 text-center items-center sm:p-0 w-full cursor-auto"
      on:click|self={close}
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg"
      >
        <div class="bg-white p-4 sm:p-6 select-text">
          <slot />
        </div>
        <button
          class="absolute inset-4 sm:inset-6 ml-auto h-6 w-6 p-0.5 text-gray-400 hover:text-gray-500 active:text-gray-600 transition-all"
          aria-label="Close"
          on:click={close}
        >
          <XIcon />
        </button>
      </div>
    </button>
  </div>
</div>
