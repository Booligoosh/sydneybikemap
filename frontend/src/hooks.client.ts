/// <reference types="vite-plugin-pwa/client" />
import type { ClientInit } from "@sveltejs/kit";
import { registerSW } from "virtual:pwa-register";

export const init: ClientInit = () => {
  // Future proof with a version so we can perform 'migrations' or show explainers
  // about a change in visualisation to users who were used to something else.
  //
  // For now, we're using the presence of this (don't care about the number) to see
  // if the user has visited the site before, so if we should start the infobox as
  // expanded or collapsed.
  //
  // This will always get set *after* the initial render (due to being in onMount).
  localStorage.setItem("lastVisitedVersion", "3");

  // When page loads, if there's no hash and we have a hash saved, use that
  if (!window.location.hash && localStorage.getItem("lastHash")) {
    window.location.hash = localStorage.getItem("lastHash") ?? "";
  }

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
