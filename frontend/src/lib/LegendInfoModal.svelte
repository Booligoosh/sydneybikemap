<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Modal from "./Modal.svelte";
  import separatedCycleway1 from "../assets/infra-examples/separatedCycleway1.jpg?w=928&h=696";
  import sharedPath1 from "../assets/infra-examples/sharedPath1.jpg?w=928&h=696";
  import sharedPath2 from "../assets/infra-examples/sharedPath2.jpg?w=928&h=696";

  export let type: "separatedCycleway" | "sharedPath" | null;

  const dispatch = createEventDispatcher();
</script>

<Modal open={!!type} on:close={() => dispatch("close")}>
  <div class="flex flex-col gap-3">
    {#if type === "separatedCycleway"}
      <h3 class="font-bold">Separated cycleways</h3>

      <p>
        Separated cycleways are separated from the road by concrete dividers or
        a kerb, and are for bikes only.
      </p>

      <img
        src={separatedCycleway1}
        alt="College Street Cycleway"
        width="4672"
        height="3504"
      />
    {/if}
    {#if type === "sharedPath"}
      <h3 class="font-bold">Shared paths</h3>

      <p>
        Shared paths are walkways, areas, or footpaths that allow both bikes and
        pedestrians. They can be marked with a blue line, white centre line,
        pedestrian/bike symbols, or a sign.
      </p>

      <img
        src={sharedPath1}
        alt="Shared Path in Mascot marked with a sign, white centre line, and pedestrian/bike symbols"
        width="3504"
        height="2628"
      />
      <img
        src={sharedPath2}
        alt="Shared Path at Circular Quay marked with a blue line"
        width="4672"
        height="3504"
      />
    {/if}
  </div>
</Modal>
