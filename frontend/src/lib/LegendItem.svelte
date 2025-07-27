<script lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { QuestionMarkCircle } from "@steeze-ui/heroicons";
  import { createEventDispatcher } from "svelte";

  export let lineStyle: string;
  export let color: string;
  export let text: string;
  export let showInfoBtn: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<div class="contents">
  <div
    class="h-0 w-7 border-b-4"
    style:border-color={color}
    style:border-style={lineStyle}
  />
  <div class="flex items-center text-sm">
    {#if showInfoBtn}
      <button
        class="contents cursor-pointer"
        title="More info"
        on:click={() => dispatch("infoclick")}
      >
        {text}&nbsp;
        <div class="inline h-[1em] w-[1em]">
          <Icon src={QuestionMarkCircle} theme="micro" />
        </div>
      </button>
    {:else}
      {text}&nbsp;
    {/if}
  </div>
</div>
