<script lang="ts">
  /**
   * NOTE: To please Google, I've set a 302 up to redirect / to /sydney
   * So this page will only run if the browser installs the Service Worker
   * which can then serve this from the precache if successful.
   *
   * This means that for users without a Service Worker precache, the redirect
   * based on lastRegion won't run, they'll just end up back at /sydney each
   * time. This is ok because that functionality is a nice-to-have, most times
   * people won't be visiting the root domain, and the only scenario where it
   * does matter (in PWA with startUrl of /), is pretty unlikely to occur without
   * a working Service Worker.
   *
   * TODO: Investigate possibility of serving this code at / with a 404 status,
   * not sure if that's a strong enough signal to tell Google not to index
   */

  import { goto } from "$app/navigation";

  if (globalThis.window) {
    const newUrl = new URL(window.location.href);
    newUrl.pathname = `/${localStorage.getItem("lastRegion") || "sydney"}`;

    goto(newUrl, { replaceState: true });
  }
</script>
