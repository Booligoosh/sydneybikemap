/// <reference types="vite-plugin-pwa/client" />
import type { ClientInit } from "@sveltejs/kit";
import { registerSW } from "virtual:pwa-register";

export const init: ClientInit = () => {
  // Register SW
  let updateSW: (reloadPage?: boolean) => Promise<void> | undefined;

  updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log("New version is available");
      // For now, just refresh straight away. Doing this rather than the autoUpdate
      // behaviour as future-proofing in case we want to display a prompt in future,
      // as it's hard to switch from autoUpdate to prompt.
      if (updateSW) updateSW(true);
    },
    onOfflineReady() {
      console.log("App is ready for offline use");
    },
    onRegisteredSW() {
      console.log("Service worker has been registered");
    },
  });
};
