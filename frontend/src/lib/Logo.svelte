<script lang="ts">
  interface Props {
    regionName: string;
  }

  let { regionName } = $props();
</script>

<h1 class="text-xl font-extrabold lg:text-2xl">
  <span style:color="hsl(211, 61%, 56%)">{regionName}</span><span
    style:color="hsl(141, 54%, 28%)">Bike</span
  ><span style:color="hsl(0,0%,50%)">Map</span>
</h1>
