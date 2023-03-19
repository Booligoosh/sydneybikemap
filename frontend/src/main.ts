import "./app.css";
import "@fontsource/inter/variable.css";
import App from "./App.svelte";
import { registerSW } from "virtual:pwa-register";

// Register SW
let updateSW;

updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("New version is available");
    // For now, just refresh straight away. Doing this rather than the autoUpdate
    // behaviour as future-proofing in case we want to display a prompt in future.
    if (updateSW) updateSW(true);
  },
  onOfflineReady() {
    console.log("App is ready for offline use");
  },
  onRegisteredSW() {
    console.log("Service worker has been registered");
  },
});

// Add event listener to persist hash to localStorage on change
// See https://stackoverflow.com/a/64927639
window.history.replaceState = new Proxy(window.history.replaceState, {
  apply: (target, thisArg, argArray) => {
    // trigger here what you need
    const hash = argArray[2].split("#")[1];
    localStorage.setItem("lastHash", hash);

    return target.apply(thisArg, argArray);
  },
});

// When page loads, if there's no hash and we have a hash saved, use that
if (!window.location.hash && localStorage.getItem("lastHash")) {
  window.location.hash = localStorage.getItem("lastHash");
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
