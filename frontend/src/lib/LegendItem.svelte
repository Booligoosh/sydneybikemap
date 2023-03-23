<script lang="ts">
  import { QuestionMarkCircleIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { createEventDispatcher } from "svelte";

  export let lineStyle: string;
  export let color: string;
  export let text: string;
  export let showInfoBtn: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<div class="contents">
  <div
    class="w-7 border-b-4 h-0"
    style:border-color={color}
    style:border-style={lineStyle}
  />
  <div class="text-sm flex items-center">
    {#if showInfoBtn}
      <button
        class="contents"
        title="More info"
        on:click={() => dispatch("infoclick")}
      >
        {text}&nbsp;
        <div class="inline w-[1em] h-[1em]">
          <QuestionMarkCircleIcon />
        </div>
      </button>
    {:else}
      {text}&nbsp;
    {/if}
  </div>
</div>
