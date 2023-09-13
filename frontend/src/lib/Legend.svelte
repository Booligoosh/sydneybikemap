<script lang="ts">
  import LegendInfoModal from "./LegendInfoModal.svelte";
  import LegendItem from "./LegendItem.svelte";

  let infoModalType: "separatedCycleway" | "sharedPath" | null = null;
</script>

<section>
  <h2 class="font-bold mb-1">Legend</h2>
  <div class="grid gap-2 grid-cols-[auto,1fr] items-center mb-1">
    <LegendItem
      text="Separated cycleway"
      color="hsl(141, 54%, 28%)"
      lineStyle="solid"
      showInfoBtn={true}
      on:infoclick={() => (infoModalType = "separatedCycleway")}
    />
    <LegendItem
      text="Shared path"
      color="hsl(211, 61%, 56%)"
      lineStyle="solid"
      showInfoBtn={true}
      on:infoclick={() => (infoModalType = "sharedPath")}
    />
    <LegendItem
      text="Safe speed street (≤30km/h limit)"
      color="hsl(31, 29%, 58%)"
      lineStyle="solid"
    />
    <LegendItem
      text="Cycleway under construction"
      color="hsl(6, 93%, 71%)"
      lineStyle="dashed"
    />
    <LegendItem
      text="Planned cycleway"
      color="hsl(300, 50%, 70%)"
      lineStyle="dashed"
    />
  </div>
  <LegendInfoModal
    type={infoModalType}
    on:close={() => (infoModalType = null)}
  />
</section>
