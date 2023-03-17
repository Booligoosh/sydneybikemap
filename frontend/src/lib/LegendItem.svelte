<script lang="ts">
  export let lineStyle: string;
  export let color: string;
  export let text: string;
</script>

<div class="contents">
  <div
    class="w-7 border-b-4 h-0"
    style:border-color={color}
    style:border-style={lineStyle}
  />
  <div class="text-sm">{text}</div>
</div>
