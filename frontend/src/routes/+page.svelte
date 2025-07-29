<script lang="ts">
  import { goto } from "$app/navigation";

  if (globalThis.window) {
    const newUrl = new URL(window.location.href);
    newUrl.pathname = "/sydney";

    goto(newUrl, { replaceState: true });
  }
</script>
