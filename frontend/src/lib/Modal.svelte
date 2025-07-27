<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { XMark } from "@steeze-ui/heroicons";
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
    class="fixed inset-0 bg-gray-500/75 transition-opacity"
    style:visibility={open ? "" : "hidden"}
    style:opacity={open ? "" : "0"}
  />

  <div
    class="fixed inset-0 z-10 w-full overflow-y-auto"
    style:visibility={open ? "" : "hidden"}
    style:opacity={open ? "" : "0"}
  >
    <div
      class="flex min-h-full w-full cursor-auto items-center justify-center p-4 text-center sm:p-0"
      on:click|self={close}
    >
      <div
        class="relative my-8 w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
      >
        <div class="bg-white p-4 select-text sm:p-6">
          <slot />
        </div>
        <button
          class="absolute inset-2 ml-auto h-6 w-6 cursor-pointer text-gray-400 transition-all hover:text-gray-500 active:text-gray-600 sm:inset-6"
          aria-label="Close"
          on:click={close}
        >
          <Icon src={XMark} theme="micro" class="size-full" />
        </button>
      </div>
    </div>
  </div>
</div>
